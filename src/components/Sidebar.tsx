import React, { useState, useRef } from 'react';
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
  const [openIframeIndex, setOpenIframeIndex] = useState<number | null>(null);
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleIframe = (index: number): void => {
    setOpenIframeIndex((prev) => {
      const newIndex = prev === index ? null : index;

      // Scroll to the iframe container if it's the last iframe being opened
      if (newIndex === index && iframeContainerRef.current) 
        iframeContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      

      return newIndex;
    });
  };

  const renderProjectList = (project: ProjectType): JSX.Element => (
    <ProjectList
      id={project.id}
      title={project.title}
      first={false}
      currentPage={currentPage}
      isProjectsOpen={isProjectsOpen}
      handleCurrentPage={handleCurrentPage}
      key={project.id}
    />
  );

  const iframesData = [
    { title: 'Iframe 1', url: 'https://example.com/page1' },
    { title: 'Iframe 2', url: 'https://example.com/page2' },
    { title: 'Iframe 3', url: 'https://example.com/page3' },
    { title: 'Iframe 4', url: 'https://example.com/page4' },
    { title: 'Iframe 5', url: 'https://example.com/page5' },
    { title: 'Iframe 6', url: 'https://example.com/page6' },
    { title: 'Iframe 7', url: 'https://example.com/page7' },
    { title: 'Iframe 8', url: 'https://example.com/page8' },
    { title: 'Iframe 9', url: 'https://example.com/page9' },
    { title: 'Iframe 10', url: 'https://example.com/page10' },
    { title: 'Iframe 11', url: 'https://example.com/page11' },
    { title: 'Iframe 12', url: 'https://example.com/page12' },
    { title: 'Iframe 13', url: 'https://example.com/page13' },
    { title: 'Iframe 14', url: 'https://example.com/page14' },
    { title: 'Iframe 15', url: 'https://example.com/page15' },
    { title: 'Iframe 16', url: 'https://example.com/page16' },
    { title: 'Iframe 17', url: 'https://example.com/page17' },
    { title: 'Iframe 18', url: 'https://example.com/page18' },
    { title: 'Iframe 19', url: 'https://example.com/page19' },
    { title: 'ABOUT', url: 'https://portfolioakd.vercel.app' }
  ];

  return (
    <aside
      className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed z-20 flex h-full w-[95vw] flex-col bg-sidebar-bg py-4 pr-2 pb-16
        pl-4 transition-transform duration-300 sm:w-[500px] sm:pl-9 sm:pt-5 overflow-y-auto`}
    >
      <div
        className='children:btn-focus flex flex-1 flex-col gap-1
                   children:flex children:cursor-pointer children:select-none children:items-center
                   children:gap-4 children:rounded children:p-2 children:transition children:duration-300
                   hover:children:bg-gray-200 focus-visible:children:ring-blue-400'
      >
        <button
          className={`${
            currentPage === 'Inbox' ? '!bg-gray-200 font-bold' : 'bg-white text-black'
          } p-2 rounded`}
          onClick={handleCurrentPage('Inbox')}
        >
          <VscInbox className='text-xl text-blue-500' /> Inbox
        </button>
        <button
          className={`${
            currentPage === 'Today' ? '!bg-gray-200 font-bold' : 'bg-white text-black'
          } btn-today before:absolute before:text-[10px] before:font-normal 
            before:text-green-500 p-2 rounded`}
          onClick={handleCurrentPage('Today')}
        >
          <BsCalendar4 className='text-xl text-green-500' />
          Today
        </button>
        <button
          className={`${
            !['Inbox', 'Today'].includes(currentPage) ? '!bg-gray-200' : 'bg-white text-black'
          } !mb-0 p-2 rounded`}
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
          {allProjects.map(renderProjectList)}
          {isFetching && <Fetching sidebar />}
          <button
            className={`${
              !allProjects.length && 'mt-1'
            } group flex items-center gap-2 hover:bg-gray-300`}
            type='button'
            onClick={isSignedIn ? addProject : changeModalMode('notSignedIn')}
            tabIndex={isProjectsOpen ? 0 : -1}
            style={{ backgroundColor: 'white', color: 'black' }} // Button color set to white
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
      <div className='mt-4 space-y-2' ref={iframeContainerRef}>
        {isSignedIn ? (
          iframesData.map((iframeData, index) => (
            <div key={index}>
              <button
                onClick={(): void => toggleIframe(index)} // Explicit return type added
                className='bg-white text-black p-2 rounded w-full'
              >
                {iframeData.title}
              </button>
              {openIframeIndex === index && (
                <div className='mt-2 h-[400px] w-full border-2 border-gray-300'>
                  <iframe
                    src={iframeData.url} // Use the corresponding URL
                    className='w-full h-full'
                    title={iframeData.title} // Use the title for accessibility
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>Please sign in to access iFrames.</p>
        )}
      </div>
    </aside>
  );
}
