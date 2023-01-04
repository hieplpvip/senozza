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
} from '@chakra-ui/react';

import { MarkdownEditor } from '../../../components/Markdown';

export default function CreateCommentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Answer question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Your answer</FormLabel>
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
