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

import { MarkdownEditor } from '../../../components/Markdown';

export default function EditPostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [markdown, setMarkdown] = useState('Enter some *markdown* here!');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl className='mb-3'>
            <FormLabel>Title</FormLabel>
            <Input type='text' placeholder='e.g. CS300' />
          </FormControl>
          <FormControl className='mb-4'>
            <FormLabel>Content</FormLabel>
            <MarkdownEditor height='40vh' width='50vw' value={markdown} setValue={setMarkdown} />
          </FormControl>
          <FormControl className='flex justify-end'>
            <Button colorScheme='indigo' onClick={onClose}>
              Create
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
