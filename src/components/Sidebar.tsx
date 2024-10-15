import {
  VscAdd,
  VscInbox,
  VscChevronUp,
  BsCalendar3,
  BsCalendar4
} from '../assets';
import { Profile, ProjectList } from './core';
import { Fetching } from './ui';
import type { ProjectType } from '../types';



interface SidebarProps {
  isLoading: boolean;
  isSignedIn: boolean;
  isFetching: boolean;
  currentPage: string;
  allProjects: ProjectType[];
  isSidebarOpen: boolean;
  isProjectsOpen: boolean;
  addProject: () => void;
  changeModalMode: (mode: 'notSignedIn' | 'signOut') => () => void;
  handleCurrentPage: (page: string) => () => void;
  handleProjectsClickOpen: () => void;
}

export function Sidebar({
  isLoading,
  isSignedIn,
  isFetching,
  currentPage,
  allProjects,
  isSidebarOpen,
  isProjectsOpen,
  addProject,
  changeModalMode,
  handleCurrentPage,
  handleProjectsClickOpen
}: SidebarProps): JSX.Element {
  
  return (
    <aside
      className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed z-20 flex h-full w-[75vw] flex-col bg-sidebar-bg py-4 pr-2 pb-16
        pl-4 transition-transform duration-300 sm:w-[300px] sm:pl-9 sm:pt-5`}
    >
      <div
        className='children:btn-focus flex flex-1 flex-col gap-1
                   children:flex children:cursor-pointer children:select-none children:items-center
                   children:gap-4 children:rounded children:p-2 children:transition children:duration-300
                   hover:children:bg-white focus-visible:children:ring-blue-400'
      >
        <button
          className={`${currentPage === 'Inbox' && '!bg-gray-200 font-bold'}`}
          onClick={handleCurrentPage('Inbox')}
        >
          <VscInbox className='text-xl text-blue-500' /> Inbox
        </button>
        <button
          className={`${
            currentPage === 'Today' && '!bg-gray-200 font-bold'
          } btn-today before:absolute before:text-[10px] before:font-normal 
            before:text-green-500`}
          onClick={handleCurrentPage('Today')}
        >
          <BsCalendar4 className='text-xl text-green-500' />
          Today
        </button>
        <button
          className={`${
            !['Inbox', 'Today'].includes(currentPage) && '!bg-gray-200'
          } !mb-0`}
          onClick={handleProjectsClickOpen}
        >
          <BsCalendar3 className='text-xl text-purple-500' />
          Projects
          <VscChevronUp
            className={`${
              isProjectsOpen ? 'rotate-180' : 'rotate-0'
            } ml-auto text-xl transition-transform duration-300`}
          />
        </button>
        <div
          id='projects'
          className='children:btn-focus ml-9 -mr-2 flex max-h-[500px] flex-col !gap-2 overflow-hidden
                     !p-0 !pr-2 hover:!bg-transparent children:w-[calc(100%-6px)] children:rounded children:p-1 
                     hover:children:bg-white'
        >
          {allProjects.map(({ id, title }, index) => (
            <ProjectList
              id={id}
              title={title}
              first={index === 0}
              currentPage={currentPage}
              isProjectsOpen={isProjectsOpen}
              handleCurrentPage={handleCurrentPage}
              key={id}
            />
          ))}
          {isFetching && <Fetching sidebar />}
          <button
            className={`${
              !allProjects.length && 'mt-1'
            } group flex items-center gap-2 hover:!bg-transparent hover:text-red-500`}
            type='button'
            onClick={isSignedIn ? addProject : changeModalMode('notSignedIn')}
            tabIndex={isProjectsOpen ? 0 : -1}
          >
            <i className='rounded-full p-1 transition-colors duration-300 group-hover:bg-red-500'>
              <VscAdd className='transition-colors duration-300 group-hover:text-white' />{' '}
            </i>
            New Project
          </button>
        </div>
      </div>
      <div className='flex min-h-[48px] items-center rounded bg-gray-200 p-2 px-3'>
        {isLoading ? (
          <Fetching sidebar />
        ) : (
          <Profile isSignedIn={isSignedIn} changeModalMode={changeModalMode} />
        )}
      </div>
    </aside>
  );
}
