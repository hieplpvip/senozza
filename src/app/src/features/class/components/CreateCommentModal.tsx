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

import { MarkdownEditor } from '../../../components/Markdown';

export default function CreateCommentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [markdown, setMarkdown] = useState('Enter some *markdown* here!');

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
            <Button colorScheme='indigo' onClick={onClose}>
              Post answer
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
