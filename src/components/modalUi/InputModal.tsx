import { Dialog } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';
import { VscClose } from '../../assets';
import { useModal } from '../../context';
import { TaskModal } from './TaskModal';
import { ProjectModal } from './ProjectModal';
import type { ModalType } from '../../types';

interface InputModalProps {
  modalMode: ModalType;
  closeModal: () => void;
}

export function InputModal({
  modalMode,
  closeModal
}: InputModalProps): JSX.Element {
  const { onSubmit } = useModal();
  const { handleSubmit } = useFormContext();

  return (
    <>
      <div className='flex justify-between border-b-2 pb-2'>
        <Dialog.Title className='text-lg font-medium leading-6 text-gray-900'>
          {`${['addTask', 'addProject'].includes(modalMode) ? 'New' : 'Edit'} ${
            ['addProject', 'editProject'].includes(modalMode)
              ? 'Project'
              : 'Task'
          }`}
        </Dialog.Title>
        <button
          type='button'
          className='btn-focus rounded-full p-1 text-xl transition-colors duration-300
                     hover:animate-spin hover:bg-red-500 hover:text-white'
          onClick={closeModal}
        >
          <VscClose />
        </button>
      </div>
      <form
        className='mt-4'
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
        {['addTask', 'editTask'].includes(modalMode) ? (
          <TaskModal />
        ) : (
          <ProjectModal />
        )}
        <div
          className='mt-4 flex justify-end gap-2 
                     children:rounded-md children:border-2 children:px-4
                     children:py-2 children:text-sm
                     children:transition-colors children:duration-300'
        >
          <button
            type='button'
            className='btn-focus hover:bg-gray-500 hover:text-white 
                       focus-visible:ring-gray-400 focus-visible:ring-offset-2'
            onClick={closeModal}
          >
            Close
          </button>
          <button
            type='submit'
            className='border-transparent bg-nav-bg text-white hover:bg-red-400 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-nav-bg focus-visible:ring-offset-2'
          >
            {`${modalMode === 'editTask' ? 'Update' : 'Add'} ${
              ['addProject', 'editProject'].includes(modalMode)
                ? 'Project'
                : 'Task'
            }`}
          </button>
        </div>
      </form>
    </>
  );
}
