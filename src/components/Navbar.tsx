import { FiMenu, AiOutlineHome, VscAdd } from '../assets';

interface NavbarProps {
  isSignedIn: boolean;
  addTask: () => void;
  changeModalMode: (mode: 'notSignedIn' | 'signOut') => () => void;
  handleCurrentPage: (targetPage: string) => () => void;
  handleSidebarClick: () => void;
}

export function Navbar({
  isSignedIn,
  addTask,
  changeModalMode,
  handleCurrentPage,
  handleSidebarClick
}: NavbarProps): JSX.Element {
  return (
    <nav
      className='flex w-full justify-between bg-nav-bg px-5 py-3 
               text-white children:flex children:gap-2 sm:px-10'
    >
      <div
        className='children:btn-focus children:rounded children:p-1 children:text-xl
                   children:transition hover:children:bg-white-ish focus-visible:children:ring-gray-200'
      >
        <button type='button' onClick={handleSidebarClick}>
          <FiMenu />
        </button>
        <button type='button' onClick={handleCurrentPage('Today')}>
          <AiOutlineHome />
        </button>
        
      </div>
      <div
        className='children:btn-focus flex gap-2 children:rounded children:p-1
                   children:text-xl children:transition-colors hover:children:bg-white-ish 
                   focus-visible:children:ring-gray-200'
      >
        <button
          type='button'
          onClick={isSignedIn ? addTask : changeModalMode('notSignedIn')}
        >
          <VscAdd />
        </button>
      </div>
    </nav>
  );
}
