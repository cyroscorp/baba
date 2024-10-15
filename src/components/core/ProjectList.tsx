import { useSidebar } from '../../context';
import { ToolTips } from '../ui';
import { truncateString } from '../../utils';
import { FiTrash2, FiEdit3, AiFillPushpin } from '../../assets';

interface ProjectListProps {
  id: number;
  first: boolean;
  title: string;
  currentPage: string;
  isProjectsOpen: boolean;
  handleCurrentPage: (page: string) => () => void;
}

export function ProjectList({
  id,
  title,
  first,
  currentPage,
  isProjectsOpen,
  handleCurrentPage
}: ProjectListProps): JSX.Element {
  const { editProject, removeProject } = useSidebar();
  const truncatedTitle = truncateString(title, 16);

  return (
    <a
      key={id}
      className={`${
        currentPage === title && '!bg-gray-200 font-bold'
      } group flex animate-fade items-center justify-between text-sm transition-colors first:mt-1 last:mb-1`}
      role='button'
      tabIndex={isProjectsOpen ? 0 : -1}
      onClick={handleCurrentPage(title)}
    >
      <div className='flex items-center gap-2'>
        <i className='text-red-400'>
          <AiFillPushpin size={16} />
        </i>
        <p>{truncatedTitle}</p>
      </div>
      <div
        className='children:btn-focus children:group-sidebar invisible flex gap-1
                   self-start opacity-0 transition-opacity 
                   duration-300 group-hover:visible group-hover:opacity-100 children:relative
                   children:rounded children:p-1 hover:children:bg-gray-100'
      >
        <button
          className='group-sidebar'
          type='button'
          onClick={editProject(id)}
        >
          <ToolTips Icon={FiEdit3} tips='Edit' sidebar first={first} />
        </button>
        <button
          className='group-sidebar'
          type='button'
          onClick={removeProject(id)}
        >
          <ToolTips Icon={FiTrash2} tips='Delete' sidebar first={first} />
        </button>
      </div>
    </a>
  );
}
