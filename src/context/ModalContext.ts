import { useContext, createContext } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { ProjectType, TaskType } from '../types';

interface ModalContextProps {
  currentPage: string;
  allProjects: ProjectType[];
  allTasks: TaskType[];
  selectedTaskId: null | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: SubmitHandler<any>;
  removeTask: (targetId?: number) => (e: React.MouseEvent) => void;
  removeProject: (targetId?: number) => (e: React.MouseEvent) => void;
  handleUserSignOut: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export function useModal(): ModalContextProps {
  const context = useContext(ModalContext);

  if (!context) throw new Error('useModal must be used within a ModalContext');

  return context;
}
