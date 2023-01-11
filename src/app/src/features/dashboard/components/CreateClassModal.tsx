import { useForm } from 'react-hook-form';
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
  Select,
} from '@chakra-ui/react';

import { useCreateClassMutation } from '../../api';
import { useAppDispatch } from '../../../app/hooks';
import { setSelectedClassId } from '../../class/classSlide';

interface CreateClassFormInput {
  courseCode: string;
  courseName: string;
  year: number;
  semester: string;
}

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

export default function CreateClassModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<CreateClassFormInput>();
  const [createClass] = useCreateClassMutation();

  const onSubmit = async (data: CreateClassFormInput) => {
    try {
      const resp = await createClass(data).unwrap();
      dispatch(setSelectedClassId(resp._id));
      onClose();
    } catch (err) {
      alert(`Failed to create class: ${err}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Class</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl className='mb-3'>
              <FormLabel>Class code</FormLabel>
              <Input type='text' placeholder='e.g. CS300' required {...register('courseCode')} />
            </FormControl>
            <FormControl className='mb-3'>
              <FormLabel>Class name</FormLabel>
              <Input
                type='text'
                placeholder='e.g. Elements of Software Engineering'
                required
                {...register('courseName')}
              />
            </FormControl>
            <FormControl className='mb-3'>
              <FormLabel>Semester</FormLabel>
              <Select defaultValue='spring' {...register('semester')}>
                <option value='spring'>Spring</option>
                <option value='summer'>Summer</option>
                <option value='fall'>Fall</option>
                <option value='winter'>Winter</option>
              </Select>
            </FormControl>
            <FormControl className='mb-4'>
              <FormLabel>Year</FormLabel>
              <Select defaultValue={2023} {...register('year')}>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className='flex justify-end'>
              <Button colorScheme='indigo' type='submit'>
                Create
              </Button>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
