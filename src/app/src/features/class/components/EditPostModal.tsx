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

import { useEditPostMutation } from '../../api';
import { MarkdownEditor } from '../../../components/Markdown';

export default function EditPostModal({
  isOpen,
  onClose,
  postId,
  title: _title,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  title: string;
  content: string;
}) {
  const [title, setTitle] = useState(_title);
  const [markdown, setMarkdown] = useState(content);
  const [editPost] = useEditPostMutation();

  const onSubmit = async () => {
    if (title === '') {
      alert('Title must not be empty.');
      return;
    }

    try {
      const body = {
        title,
        question: {
          content: markdown,
        },
      };
      await editPost({ postId, body }).unwrap();
      onClose();
    } catch (err) {
      alert('Failed to edit question');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit question</ModalHeader>
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
            <Button colorScheme='indigo' onClick={onSubmit}>
              Edit question
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
