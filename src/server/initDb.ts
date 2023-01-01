import _fetch from 'node-fetch';

const STUDENTS = [
  {
    email: 'student1@gmail.com',
    firstName: 'Khoa',
    lastName: 'Nguyen',
    birth: '2002-01-01',
    role: 'student',
  },
  {
    email: 'student2@gmail.com',
    firstName: 'Long',
    lastName: 'Nguyen',
    birth: '2002-01-01',
    role: 'student',
  },
  {
    email: 'student3@gmail.com',
    firstName: 'Duy',
    lastName: 'Phan',
    birth: '2002-01-01',
    role: 'student',
  },
  {
    email: 'student4@gmail.com',
    firstName: 'Huan',
    lastName: 'Le',
    birth: '2002-01-01',
    role: 'student',
  },
];

const TEACHERS = [
  {
    email: 'prof1@gmail.com',
    password: 'demo',
    firstName: 'Hiep',
    lastName: 'Le',
    birth: '2002-01-01',
    role: 'instructor',
  },
];

const CLASSES = [
  {
    courseCode: 'CS300',
    courseName: 'Software Engineering',
    year: 2023,
    semester: 1,
  },
  {
    courseCode: 'CS418',
    courseName: 'Natural Language Processing',
    year: 2023,
    semester: 1,
  },
  {
    courseCode: 'MTH346',
    courseName: 'Number Theory',
    year: 2023,
    semester: 1,
  },
  {
    courseCode: 'CS420',
    courseName: 'Artificial Intelligence',
    year: 2023,
    semester: 1,
  },
];

const JOIN = [
  [0, 1, 2],
  [0, 2],
  [0, 2, 3],
  [0, 1, 2, 3],
];

const POSTS = [
  {
    title: 'Ask for problem 1',
    category: 'Homework 1',
    question: {
      createdDate: '2022-12-25T13:45:17.000Z',
      content: 'This is 1st sample question...',
    },
  },
  {
    title: 'Ask for problem 2',
    category: 'Homework 1',
    question: {
      createdDate: '2022-12-25T14:45:17.000Z',
      content: 'This is 2nd sample question...',
    },
  },
  {
    title: 'Ask for problem 3',
    category: 'Homework 1',
    question: {
      createdDate: '2022-12-25T15:45:17.000Z',
      content: 'This is 3rd sample question...',
    },
  },
  {
    title: 'Ask for problem 1',
    category: 'Homework 2',
    question: {
      createdDate: '2022-12-25T16:45:17.000Z',
      content: 'This is 4th sample question...',
    },
  },
];

const API_BASE_URL = 'http://localhost:3001';

async function fetch({
  path,
  method,
  body,
  accessToken,
  json = true,
}: {
  path: string;
  method: string;
  body: any;
  accessToken?: string;
  json?: boolean;
}) {
  const response = await _fetch(API_BASE_URL + path, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  const res = await (json ? response.json() : response.text());
  console.log(path, res);
  return res;
}

function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return new Uint32Array([hash])[0].toString(36);
}

interface SignInArg {
  email: string;
}

async function login(user: SignInArg) {
  const response = await fetch({
    path: '/auth/login',
    method: 'POST',
    body: { ...user, password: 'demo' },
  });

  return response;
}

interface SignUpArg {
  email: string;
  firstName: string;
  lastName: string;
  birth: string;
  role: string;
}

async function signUp(user: SignUpArg) {
  const response = await fetch({
    path: '/auth/register',
    method: 'POST',
    body: {
      ...user,
      password: 'demo',
      imgUrl: `https://avatars.dicebear.com/api/bottts/${simpleHash(
        user.email,
      )}.svg?size=128`,
    },
  });

  return response;
}

interface CreateClassArg {
  courseCode: string;
  courseName: string;
  year: number;
  semester: number;
}

async function createClass(accessToken: string, body: CreateClassArg) {
  const response = await fetch({
    path: '/class/create',
    method: 'POST',
    body,
    accessToken,
  });

  return response;
}

async function joinClass(
  accessToken: string,
  classId: string,
  emails: string[],
) {
  const response = await fetch({
    path: `/class/invite?classId=${classId}`,
    method: 'PUT',
    body: { emails },
    accessToken,
    json: false,
  });

  return response;
}

interface CreatePostArg {
  title: string;
  category: string;
  question: {
    createdDate: string;
    content: string;
  };
}

async function createPost(
  accessToken: string,
  classId: string,
  body: CreatePostArg,
) {
  const response = await fetch({
    path: `/post/create?classId=${classId}`,
    method: 'POST',
    body: { ...body, classId },
    accessToken,
  });

  return response;
}

async function main() {
  await Promise.all(TEACHERS.map((user) => signUp(user)));
  await Promise.all(STUDENTS.map((user) => signUp(user)));

  const { accessToken } = await login(TEACHERS[0]);

  const classes = await Promise.all(
    CLASSES.map((classDto) => createClass(accessToken, classDto)),
  );

  for (let i = 0; i < classes.length; i++) {
    const { _id } = classes[i];
    const emails = JOIN[i].map((index) => STUDENTS[index].email);
    await joinClass(accessToken, _id, emails);

    await Promise.all(POSTS.map((post) => createPost(accessToken, _id, post)));
  }
}

main().catch((err) => console.error(err));
