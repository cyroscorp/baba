import { useContext, createContext } from 'react';
import type { TaskType } from '../types';

interface ContentContextProps {
  allTasks: TaskType[];
  viewTask: (targetId: number) => () => void;
  toggleCompleted: (targetId: number) => (e: React.MouseEvent) => void;
  editTask: (targetId: number) => (e: React.MouseEvent) => void;
  removeTask: (targetId: number) => (e: React.MouseEvent) => void;
}

export const ContentContext = createContext<ContentContextProps | null>(null);

export function useContent(): ContentContextProps {
  const context = useContext(ContentContext);

  if (!context)
    throw new Error('useContent must be used within a ContentContext');

  return context;
}
