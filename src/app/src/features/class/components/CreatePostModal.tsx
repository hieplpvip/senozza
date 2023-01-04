import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

import { useCreatePostMutation } from '../../api';
import { MarkdownEditor } from '../../../components/Markdown';
import { useAppSelector } from '../../../app/hooks';

export default function CreatePostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const classId = useAppSelector((state) => state.class.selectedClassId);
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('Enter some *markdown* here!');
  const [createPost] = useCreatePostMutation();

  const onSubmit = async () => {
    if (title === '') {
      alert('Title must not be empty.');
      return;
    }

    try {
      const body = {
        title,
        category: 'Uncategorized',
        question: {
          createdDate: new Date().toJSON(),
          content: markdown,
        },
      };
      await createPost({ classId, body }).unwrap();
      onClose();
    } catch (err) {
      alert('Failed to post');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ask a Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl className='mb-3'>
            <FormLabel>Title</FormLabel>
            <Input type='text' placeholder='e.g. CS300' value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl className='mb-4'>
            <FormLabel>Content</FormLabel>
            <MarkdownEditor height='40vh' width='50vw' value={markdown} setValue={setMarkdown} />
          </FormControl>
          <FormControl className='flex justify-end'>
            <Button colorScheme='indigo' type='submit' onClick={onSubmit}>
              Post question
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
