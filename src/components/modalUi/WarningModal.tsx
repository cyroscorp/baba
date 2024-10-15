import { Dialog } from '@headlessui/react';
import { useModal } from '../../context';
import { VscWarning } from '../../assets';

interface RemoveModalProps {
  modalMode: string;
  closeModal: () => void;
}

export function WarningModal({
  modalMode,
  closeModal
}: RemoveModalProps): JSX.Element {
  const { removeTask, removeProject, handleUserSignOut } = useModal();

  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <i className='text-8xl text-orange-400'>
        <VscWarning />
      </i>
      <Dialog.Description className='text-lg'>
        {`Are you sure you want to ${
          modalMode !== 'signOut'
            ? `remove this ${modalMode === 'removeTask' ? 'task' : 'project'}`
            : 'sign out'
        }`}
      </Dialog.Description>
      <div
        className='children:btn-focus flex gap-2 self-end children:rounded-md children:border 
                   children:border-gray-300 children:px-4 children:py-2 children:transition-colors
                   children:duration-300 hover:children:text-white'
      >
        <button
          className='hover:bg-gray-500 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
          type='button'
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className='bg-nav-bg text-white hover:bg-red-400 focus-visible:ring-nav-bg
                     focus-visible:ring-offset-2'
          type='button'
          onClick={
            modalMode === 'signOut'
              ? handleUserSignOut
              : modalMode === 'removeTask'
              ? removeTask()
              : removeProject()
          }
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
