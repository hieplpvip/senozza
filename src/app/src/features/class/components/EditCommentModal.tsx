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
} from '@chakra-ui/react';

import { useEditCommentMutation } from '../../api';
import { MarkdownEditor } from '../../../components/Markdown';

export default function EditCommentModal({
  isOpen,
  onClose,
  postId,
  commentId,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  commentId: string;
  content: string;
}) {
  const [markdown, setMarkdown] = useState(content);
  const [editComment] = useEditCommentMutation();

  const onSubmit = async () => {
    if (markdown === '') {
      alert('Content must not be empty.');
      return;
    }

    try {
      const body = {
        content: markdown,
      };
      await editComment({ postId, commentId, body }).unwrap();
      onClose();
    } catch (err) {
      alert('Failed to edit answer');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit answer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl className='mb-4'>
            <FormLabel>Content</FormLabel>
            <MarkdownEditor height='40vh' width='50vw' value={markdown} setValue={setMarkdown} />
          </FormControl>
          <FormControl className='flex justify-end'>
            <Button colorScheme='indigo' onClick={onSubmit}>
              Edit answer
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
