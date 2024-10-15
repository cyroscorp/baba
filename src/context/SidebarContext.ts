import { useContext, createContext } from 'react';

interface SidebarContextProps {
  editProject: (targetId: number) => (e: React.MouseEvent) => void;
  removeProject: (targetId: number) => (e: React.MouseEvent) => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar(): SidebarContextProps {
  const context = useContext(SidebarContext);

  if (!context)
    throw new Error('useSidebar must be used within a SidebarContext');

  return context;
}
