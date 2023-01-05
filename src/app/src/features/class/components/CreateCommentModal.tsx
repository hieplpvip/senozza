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

import { useCommentOnPostMutation } from '../../api';
import { MarkdownEditor } from '../../../components/Markdown';

export default function CreateCommentModal({
  isOpen,
  onClose,
  postId,
}: {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}) {
  const [markdown, setMarkdown] = useState('Enter some *markdown* here!');
  const [postComment] = useCommentOnPostMutation();

  const onSubmit = async () => {
    if (markdown === '') {
      alert('Answer must not be empty.');
      return;
    }

    try {
      const body = {
        createdDate: new Date().toJSON(),
        content: markdown,
      };
      await postComment({ postId, body }).unwrap();
      onClose();
    } catch (err) {
      alert('Failed to post answer');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Answer this question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl className='mb-4'>
            <FormLabel>Your answer</FormLabel>
            <MarkdownEditor height='40vh' width='50vw' value={markdown} setValue={setMarkdown} />
          </FormControl>
          <FormControl className='mb-1 flex justify-end'>
            <Button colorScheme='indigo' onClick={onSubmit}>
              Post answer
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
