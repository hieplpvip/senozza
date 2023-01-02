import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

import { MarkdownEditor } from '../../../components/Markdown';

export default function CreatePostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
          <FormControl>
            <FormLabel>Content</FormLabel>
            <MarkdownEditor height='40vh' width='50vw' />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='indigo' onClick={onClose}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
