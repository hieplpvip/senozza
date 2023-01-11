import _fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:3001';

const PASSWORD = '98JN2CZs22kp';

const STUDENTS = [
  {
    code: 'student1',
    email: 'student1@gmail.com',
    firstName: 'Khoa',
    lastName: 'Nguyen',
    birth: '2002-01-01',
    role: 'student',
  },
  {
    code: 'student2',
    email: 'student2@gmail.com',
    firstName: 'Long',
    lastName: 'Nguyen',
    birth: '2002-01-01',
    role: 'student',
  },
  {
    code: 'student3',
    email: 'student3@gmail.com',
    firstName: 'Duy',
    lastName: 'Phan',
    birth: '2002-01-01',
    role: 'student',
  },
  {
    code: 'student4',
    email: 'student4@gmail.com',
    firstName: 'Huan',
    lastName: 'Le',
    birth: '2002-01-01',
    role: 'student',
  },
];

const INSTRUCTORS = [
  {
    code: 'prof1',
    email: 'prof1@gmail.com',
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
    instructor: 'prof1',
    students: ['student1', 'student2', 'student3', 'student4'],
  },
  {
    courseCode: 'CS311',
    courseName: 'Computational Structures',
    year: 2023,
    semester: 1,
    instructor: 'prof1',
    students: ['student1', 'student2', 'student4'],
  },

  {
    courseCode: 'CS418',
    courseName: 'Natural Language Processing',
    year: 2023,
    semester: 1,
    instructor: 'prof1',
    students: ['student3', 'student4'],
  },
  {
    courseCode: 'CS420',
    courseName: 'Artificial Intelligence',
    year: 2023,
    semester: 1,
    instructor: 'prof1',
    students: ['student1', 'student2'],
  },
  {
    courseCode: 'MTH346',
    courseName: 'Number Theory',
    year: 2023,
    semester: 1,
    instructor: 'prof1',
    students: ['student1', 'student2', 'student3'],
  },
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
    title: 'Ask for problem 4',
    category: 'Homework 2',
    question: {
      createdDate: '2022-12-25T16:45:17.000Z',
      content: 'This is 4th sample question...',
    },
  },
];

const ANSWERS = [
  {
    createdDate: '2022-12-24T17:00:00.000Z',
    content: 'This is 1st answer',
  },
  {
    createdDate: '2022-12-24T17:10:00.000Z',
    content: 'This is 2nd answer',
  },
  {
    createdDate: '2022-12-24T17:20:00.000Z',
    content: 'This is 3rd answer',
  },
  {
    createdDate: '2022-12-24T17:30:00.000Z',
    content: 'This is 4th answer',
  },
];

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
    body: { ...user, password: PASSWORD },
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
      password: PASSWORD,
      imgUrl: `https://avatars.dicebear.com/api/bottts/${simpleHash(user.email)}.svg?size=128`,
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

async function joinClass(accessToken: string, classId: string, emails: string[]) {
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

async function createPost(accessToken: string, classId: string, body: CreatePostArg) {
  const response = await fetch({
    path: `/post/create?classId=${classId}`,
    method: 'POST',
    body: { ...body, classId },
    accessToken,
  });

  return response;
}

interface CreateAnswerArg {
  createdDate: string;
  content: string;
}

async function createAnswer(accessToken: string, postId: string, body: CreateAnswerArg) {
  const response = await fetch({
    path: `/post/comment/answer?postId=${postId}`,
    method: 'POST',
    body,
    accessToken,
  });

  return response;
}

async function main() {
  // Create users
  await Promise.all(INSTRUCTORS.map((user) => signUp(user)));
  await Promise.all(STUDENTS.map((user) => signUp(user)));

  // Convert to dict for easy access
  const instructors = {};
  for (const instructor of INSTRUCTORS) {
    instructors[instructor.code] = {
      ...instructors,
      accessToken: (await login(instructor)).accessToken,
    };
  }

  const students = {};
  for (const student of STUDENTS) {
    students[student.code] = {
      ...student,
      accessToken: (await login(student)).accessToken,
    };
  }

  // Create classes
  const classes = {};
  for (const _class of CLASSES) {
    const accessToken = instructors[_class.instructor].accessToken;
    const data = await createClass(accessToken, _class);
    await joinClass(
      accessToken,
      data._id,
      _class.students.map((code) => students[code].email),
    );
    classes[data.courseCode] = data;

    await Promise.all(
      POSTS.map(async (post) => {
        const _post = await createPost(students[_class.students[0]].accessToken, data._id, post);
        await Promise.all(
          ANSWERS.map((answer) => createAnswer(students[_class.students[0]].accessToken, _post._id, answer)),
        );
        return _post;
      }),
    );
  }
}

main().catch((err) => console.error(err));
