import { Dialog } from '@headlessui/react';
import { VscWarning } from '../../assets';

interface NotSignedInModalProps {
  closeModal: () => void;
}

export function NotSignedInModal({
  closeModal
}: NotSignedInModalProps): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <i className='text-8xl text-orange-400'>
        <VscWarning />
      </i>
      <Dialog.Description className='text-lg'>
        You must be logged in to use this feature
      </Dialog.Description>
      <button
        className='btn-focus self-end rounded-md border-2 border-transparent 
                   bg-green-500 px-4 py-2 text-sm text-white transition-colors
                   duration-300 hover:bg-green-400 focus-visible:ring-green-500 
                   focus-visible:ring-offset-2'
        type='button'
        onClick={closeModal}
      >
        Okay
      </button>
    </div>
  );
}
