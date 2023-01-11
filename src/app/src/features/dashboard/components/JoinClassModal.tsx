import { useState } from 'react';
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

import { useJoinClassByCodeMutation } from '../../api';
import { useAppDispatch } from '../../../app/hooks';
import { setSelectedClassId } from '../../class/classSlide';

export default function JoinClassModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const [joinClassByCode] = useJoinClassByCodeMutation();

  const onSubmit = async () => {
    try {
      const resp = await joinClassByCode(code).unwrap();
      dispatch(setSelectedClassId(resp._id));
      onClose();
    } catch (err) {
      alert('Failed to joined');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join Class</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Invite Code</FormLabel>
            <Input type='text' placeholder='e.g. 7xrM2l78SD' value={code} onChange={(e) => setCode(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='indigo' onClick={onSubmit}>
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
