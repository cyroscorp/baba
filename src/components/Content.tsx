import { useState, useEffect } from 'react';
import { LoginControl, TaskList } from './core';
import { Fetching, NoContent } from './ui';
import type { TaskType } from '../types';

interface ContentProps {
  isError: boolean;
  allTasks: TaskType[];
  isMobile: boolean;
  isSignedIn: boolean;
  isFetching: boolean;
  currentPage: string;
  isSidebarOpen: boolean;
  handleSidebarClick: () => void;
}

export function Content({
  isError,
  allTasks,
  isMobile,
  isSignedIn,
  isFetching,
  currentPage,
  isSidebarOpen,
  handleSidebarClick
}: ContentProps): JSX.Element {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(true);
    const timeoutId = setTimeout(() => !isError && setIsFirstLoad(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [isSignedIn, isError]);

  useEffect(() => {
    if (isSignedIn && !isFetching) setIsFirstLoad(false);
  }, [isFetching]);

  const filteredTasks = allTasks.filter(({ date, project }) =>
    currentPage === 'Inbox'
      ? true
      : currentPage === 'Today'
      ? date ===
        new Date().toLocaleDateString('en-gb').split('/').reverse().join('-')
      : !['Inbox', 'Today'].includes(currentPage)
      ? project === currentPage
      : false
  );

  return (
    <main
      className={`${
        isSidebarOpen && 'sm:ml-[300px]'
      } relative p-5 transition-all duration-300 
        children:mx-auto children:max-w-5xl sm:p-10`}
    >
      <div
        className={`${
          isMobile && isSidebarOpen ? 'z-10 opacity-100' : '-z-10 opacity-0'
        } absolute inset-0 bg-white-ish transition-opacity duration-300`}
        onClick={handleSidebarClick}
      />
      {isFirstLoad ? (
        <Fetching content />
      ) : !isSignedIn ? (
        <LoginControl />
      ) : (
        <div className='mr-4 flex flex-col gap-6'>
          <h1 className='truncate-text text-4xl font-bold'>{currentPage}</h1>
          <div
            className='-mx-4 -mt-2 flex h-[78vh] flex-col gap-4 overflow-y-auto 
                       px-4 pt-2 text-lg sm:-mx-6 sm:h-[74vh] sm:px-6'
          >
            {filteredTasks.length ? (
              filteredTasks.map((task, index) => (
                <TaskList key={task.id} {...task} first={index === 0} />
              ))
            ) : (
              <NoContent />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
