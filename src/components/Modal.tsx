import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  InputModal,
  WarningModal,
  ViewTaskModal,
  NotSignedInModal
} from './modalUi';
import type { ModalType } from '../types';

interface ModalProps {
  modalMode: ModalType;
  isModalOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: () => void;
}

export function Modal({
  modalMode,
  isModalOpen,
  closeModal
}: ModalProps): JSX.Element {
  return (
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog
        className='fixed inset-0 z-30 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='flex min-h-screen items-center justify-center px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-white-ish' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div
              className={`${
                ['notSignedIn', 'signOut'].includes(modalMode)
                  ? 'max-w-sm'
                  : ['addTask', 'editTask'].includes(modalMode)
                  ? 'max-w-3xl'
                  : ['viewTask', 'removeTask', 'removeProject'].includes(
                      modalMode
                    )
                  ? 'max-w-md'
                  : 'max-w-lg'
              } my-8 inline-block w-full transform overflow-hidden rounded-xl bg-white
              p-6 text-left align-middle shadow-xl transition-all sm:my-0`}
            >
              {modalMode === 'notSignedIn' ? (
                <NotSignedInModal closeModal={closeModal} />
              ) : modalMode === 'viewTask' ? (
                <ViewTaskModal closeModal={closeModal} />
              ) : ['signOut', 'removeTask', 'removeProject'].includes(
                  modalMode
                ) ? (
                <WarningModal modalMode={modalMode} closeModal={closeModal} />
              ) : (
                <InputModal modalMode={modalMode} closeModal={closeModal} />
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
