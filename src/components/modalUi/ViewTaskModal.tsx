import { useModal } from '../../context';
import { getDate } from '../../utils';
import type { TaskType } from '../../types';

interface ViewTaskModalProps {
  closeModal: () => void;
}

export function ViewTaskModal({ closeModal }: ViewTaskModalProps): JSX.Element {
  const { allTasks, selectedTaskId } = useModal();

  const { title, description, date, priority, project } = allTasks.find(
    ({ id }) => id === selectedTaskId
  ) as TaskType;

  const formattedDate = getDate(date);

  return (
    <>
      <div className='flex flex-col gap-4 children:flex children:flex-col children:gap-1'>
        <div>
          <h3 className='font-bold'>Title</h3>
          <p className='break-all rounded border border-gray-300 p-2'>
            {title}
          </p>
        </div>
        <div>
          <h3 className='font-bold'>Description</h3>
          <textarea
            className='resize-none rounded border border-gray-300 p-2'
            value={description}
            rows={4}
            disabled
          />
        </div>
        <div>
          <h3 className='font-bold'>Due date</h3>
          <p>{formattedDate}</p>
        </div>
        <div>
          <h3 className='font-bold'>Priority</h3>
          <p>{priority}</p>
        </div>
        <div>
          <h3 className='font-bold'>Project</h3>
          <p>{project}</p>
        </div>
      </div>
      <div
        className='mt-4 flex justify-end gap-2 
                   children:rounded-md children:border-2 children:px-4
                   children:py-2 children:text-sm
                   children:transition-colors children:duration-300'
      >
        <button
          className='btn-focus border-transparent bg-green-500 text-white hover:bg-green-400 
                     focus-visible:ring-green-500 focus-visible:ring-offset-2'
          type='button'
          onClick={closeModal}
        >
          Okay
        </button>
      </div>
    </>
  );
}
