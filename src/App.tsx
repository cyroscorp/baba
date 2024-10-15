
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { doc, onSnapshot } from 'firebase/firestore';
import {Toggle} from './jsx/fram';
import { Navbar, Sidebar, Content, Modal } from './components';
import { ContentContext, ModalContext, SidebarContext } from './context';
import { useLocalStorage as useStore, useSignInWithFirebase } from './hooks';
import {
  tasksRef,
  updateDb,
  getUserId,
  projectsRef,
  signOutUser,
  getDataFromDb
} from './services';
import { newProjectDefault, newTaskDefault } from './assets';
import type {
  AppData,
  AppDatas,
  TaskType,
  ModalType,
  ProjectType
} from './types';


export function App(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useStore(
    'isSidebarOpen',
    window.innerWidth > 800,
    window.innerWidth < 800
  );
  const [isProjectsOpen, setIsProjectsOpen] = useStore('isProjectOpen', true);

  const [currentPage, setCurrentPage] = useState('Inbox');
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<null | number>(null);
  const [modalMode, setModalMode] = useState<ModalType>('addTask');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isSignedIn, isLoading] = useSignInWithFirebase();

  const formMethods = useForm<AppData>({
    defaultValues: newTaskDefault
  });

  useEffect(() => {
    const handleContainerHeight = (): void => {
      const mainContainer = document.querySelector('main') as HTMLDivElement;
      const navContainer = document.querySelector('nav') as HTMLDivElement;
      mainContainer.style.height = `${
        window.innerHeight - navContainer.clientHeight - 1
      }px`;
    };

    handleContainerHeight();

    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 800);
      handleContainerHeight();
    };

    const todaysDate = new Date().toLocaleDateString('en-gb').slice(0, 2);

    if (parseInt(todaysDate, 10) < 10)
      document.documentElement.style.setProperty('--date-spacing', '7px');

    document.documentElement.style.setProperty('--todays-date', todaysDate);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchAllDataFromFirebase = async (): Promise<void> => {
      setIsFetching(true);

      try {
        const data = await getDataFromDb();

        if (data) {
          const [tasks, projects] = data;

          updateAppData('tasks', tasks, true);
          updateAppData('projects', projects, true);
        }

        setIsFetching(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error when fetching data from Firebase', error);
        setIsError(true);
      }
    };

    const listenToUpdate = (): (() => void) => {
      const userId = getUserId();

      const dataDoc = [tasksRef, projectsRef].map((ref) => doc(ref, userId));

      const unsubscribes = dataDoc.map((docRef, index) =>
        onSnapshot(docRef, (snapshot) =>
          updateAppData(
            !index ? 'tasks' : 'projects',
            snapshot.data()!.data,
            true
          )
        )
      );

      return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
    };

    let unsubscribe: () => void;

    if (isSignedIn) {
      fetchAllDataFromFirebase();
      unsubscribe = listenToUpdate();
    } else {
      setCurrentPage('Inbox');
      setAllTasks([]);
      setAllProjects([]);
    }

    return () => unsubscribe && unsubscribe();
  }, [isSignedIn]);

  useEffect(() => {
    if (isMobile && isSidebarOpen) setIsSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isSignedIn && isError) {
      setIsFetching(false);
      setIsError(false);
    }
  }, [allTasks, allProjects]);

  useEffect(() => {
    const projects = document.getElementById('projects') as HTMLElement;

    if (isProjectsOpen) {
      const projectsHeight = projects.scrollHeight + 16;
      projects.style.overflowY = projectsHeight >= 500 ? 'auto' : '';
      projects.style.height = `${projectsHeight}px`;
    } else projects.style.height = '0px';
  }, [isProjectsOpen, allProjects]);

  useEffect(() => {
    if (currentPage === 'Today') formMethods.setValue('project', 'Inbox');
    else if (currentPage !== 'Today')
      formMethods.setValue('project', currentPage);
  }, [currentPage, isModalOpen]);

  const updateAppData = (
    dataType: 'tasks' | 'projects',
    newData: AppDatas,
    onlyLocal?: boolean
  ): void => {
    if (dataType === 'tasks') {
      setAllTasks(newData as TaskType[]);
      if (!onlyLocal) updateDb('tasks', newData);
    } else {
      setAllProjects(newData as ProjectType[]);
      if (!onlyLocal) updateDb('projects', newData);
    }
  };

  const addTask = (): void => {
    if (modalMode !== 'addTask') formMethods.reset(newTaskDefault);

    setModalMode('addTask');
    setIsModalOpen(true);
  };

  const addProject = (): void => {
    if (modalMode !== 'addProject') formMethods.reset(newProjectDefault);

    setModalMode('addProject');
    setIsModalOpen(true);
  };

  const editTask =
    (targetId: number) =>
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      formMethods.reset(allTasks.find(({ id }) => id === targetId) as TaskType);
      setSelectedTaskId(targetId);
      setModalMode('editTask');
      setIsModalOpen(true);
    };

  const editProject =
    (targetId: number) =>
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      const project = allProjects.find(({ id }) => id === targetId);
      formMethods.reset(project);
      setSelectedTaskId(targetId);
      setModalMode('editProject');
      setIsModalOpen(true);
    };

  const removeTask =
    (targetId?: number) =>
    (e: React.MouseEvent): void => {
      if (targetId) {
        e.stopPropagation();
        setSelectedTaskId(targetId);
        setModalMode('removeTask');
        setIsModalOpen(true);
      } else if (selectedTaskId) {
        updateAppData(
          'tasks',
          allTasks.filter(({ id }) => id !== selectedTaskId)
        );
        setIsModalOpen(false);
        setSelectedTaskId(null);
      }
    };

  const removeProject =
    (targetId?: number) =>
    (e: React.MouseEvent): void => {
      if (targetId) {
        e.stopPropagation();
        setSelectedTaskId(targetId);
        setModalMode('removeProject');
        setIsModalOpen(true);
      } else if (selectedTaskId) {
        const { title: prevProjectTitle } = allProjects.find(
          ({ id }) => id === selectedTaskId
        ) as ProjectType;

        updateAppData(
          'tasks',
          allTasks.filter(({ project }) => project !== prevProjectTitle)
        );

        updateAppData(
          'projects',
          allProjects.filter(({ id }) => id !== selectedTaskId)
        );
        setIsModalOpen(false);
        setSelectedTaskId(null);

        if (currentPage === prevProjectTitle) setCurrentPage('Inbox');
      }
    };

  const viewTask = (targetId: number) => (): void => {
    setSelectedTaskId(targetId);
    setModalMode('viewTask');
    setIsModalOpen(true);
  };

  const onSubmit = (currentTask: TaskType | ProjectType): void => {
    if (modalMode === 'addTask') {
      updateAppData('tasks', [
        { ...currentTask, id: Date.now() } as TaskType,
        ...allTasks
      ]);
      setTimeout(() => {
        formMethods.reset(newTaskDefault);
      }, 250);
    } else if (modalMode === 'editTask')
      updateAppData(
        'tasks',
        allTasks.map((task) =>
          task.id === currentTask.id ? currentTask : task
        ) as TaskType[]
      );
    else if (['addProject', 'editProject'].includes(modalMode)) {
      let { title } = currentTask;

      title = title.trim();

      if (
        allProjects.find(({ title: projectTitle }) => projectTitle === title)
      ) {
        formMethods.setError('title', {
          type: 'custom',
          message: `Project with title '${title}' already exists!`
        });
        return;
      }

      if (modalMode === 'addProject') {
        updateAppData('projects', [...allProjects, { id: Date.now(), title }]);
        formMethods.reset();
      } else {
        const { title: prevProjectTitle } = allProjects.find(
          ({ id }) => id === selectedTaskId
        ) as ProjectType;

        updateAppData(
          'tasks',
          allTasks.map((task) =>
            task.project === prevProjectTitle
              ? { ...task, project: title }
              : task
          )
        );

        updateAppData(
          'projects',
          allProjects.map((project) =>
            project.id === currentTask.id ? { ...project, title } : project
          )
        );

        if (currentPage === prevProjectTitle) setCurrentPage(title);

        setSelectedTaskId(null);
      }
    }

    setIsModalOpen(false);
  };

  const toggleCompleted =
    (targetId: number) =>
    (e: React.MouseEvent): void => {
      e.stopPropagation();
      updateAppData(
        'tasks',
        allTasks.map((task) =>
          task.id === targetId ? { ...task, completed: !task.completed } : task
        )
      );
    };

  const handleSidebarClick = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCurrentPage = (targetPage: string) => () => {
    if (currentPage === targetPage) return;
    setCurrentPage(targetPage);
  };

  const handleProjectsClick = (): void => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const handleUserSignOut = (): void => {
    setIsModalOpen(false);
    signOutUser();
  };

  const changeModalMode = (mode: 'notSignedIn' | 'signOut') => () => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Toggle />
      <Navbar
        isSignedIn={isSignedIn}
        addTask={addTask}
        changeModalMode={changeModalMode}
        handleCurrentPage={handleCurrentPage}
        handleSidebarClick={handleSidebarClick}
      />
      <SidebarContext.Provider value={{ editProject, removeProject }}>
        <Sidebar
          isLoading={isLoading}
          isFetching={isFetching}
          isSignedIn={isSignedIn}
          currentPage={currentPage}
          allProjects={allProjects}
          isSidebarOpen={isSidebarOpen}
          isProjectsOpen={isProjectsOpen}
          addProject={addProject}
          changeModalMode={changeModalMode}
          handleCurrentPage={handleCurrentPage}
          handleProjectsClickOpen={handleProjectsClick}
        />
      </SidebarContext.Provider>
      <ContentContext.Provider
        value={{
          allTasks,
          viewTask,
          editTask,
          removeTask,
          toggleCompleted
        }}
      >
        <Content
          isError={isError}
          allTasks={allTasks}
          isMobile={isMobile}
          isSignedIn={isSignedIn}
          isFetching={isFetching}
          currentPage={currentPage}
          isSidebarOpen={isSidebarOpen}
          handleSidebarClick={handleSidebarClick}
        />
      </ContentContext.Provider>
      <ModalContext.Provider
        value={{
          allTasks,
          allProjects,
          currentPage,
          selectedTaskId,
          onSubmit,
          removeTask,
          removeProject,
          handleUserSignOut
        }}
      >
        <FormProvider {...formMethods}>
          <Modal
            modalMode={modalMode}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />
        </FormProvider>
      </ModalContext.Provider>
      
    </>
  );
}
