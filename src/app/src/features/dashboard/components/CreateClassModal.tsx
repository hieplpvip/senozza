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
  Select,
} from '@chakra-ui/react';

const YEARS = ['2019', '2020', '2021', '2022', '2023', '2024'];

export default function CreateClassModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Class</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl className='mb-3'>
            <FormLabel>Class code</FormLabel>
            <Input type='text' placeholder='e.g. CS300' />
          </FormControl>
          <FormControl className='mb-3'>
            <FormLabel>Class name</FormLabel>
            <Input type='text' placeholder='e.g. Elements of Software Engineering' />
          </FormControl>
          <FormControl className='mb-3'>
            <FormLabel>Semester</FormLabel>
            <Select>
              <option value='spring'>Spring</option>
              <option value='summer'>Summer</option>
              <option value='fall' selected>
                Fall
              </option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Select>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
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
