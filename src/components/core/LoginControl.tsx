import { signInWithGoogle, SignInAsGuest } from '../../services';
import { FiLogIn, FiUser, AiOutlineGoogle } from '../../assets';

export function LoginControl(): JSX.Element {
  return (
    <div className='flex h-full animate-fade flex-col items-center justify-center gap-8 text-center'>
      <h1 className='text-4xl font-bold'>To Do List</h1>
      <div
        className='flex w-full max-w-md flex-col items-center justify-center
                   gap-4 rounded-lg bg-sidebar-bg p-4 shadow 
                   transition-shadow duration-300 hover:shadow-md'
      >
        <i className='text-4xl'>
          <FiLogIn />
        </i>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h2 className='text-xl font-bold'>You are not signed in yet</h2>
          <p className='text-base'>
            Please sign in as a guest or with your google account
          </p>
        </div>
        <div
          className='children:btn-focus flex w-full justify-center gap-4 text-base children:flex
                     children:w-full children:max-w-[120px] children:items-center children:justify-center
                     children:gap-2 children:rounded children:border children:border-gray-300 
                     children:bg-white/80 children:px-3 children:py-2 children:text-lg
                     children:transition children:duration-300 hover:children:border-gray-200
                     hover:children:text-white focus-visible:children:ring-offset-2'
        >
          <button
            className='hover:bg-green-400'
            type='button'
            onClick={SignInAsGuest}
          >
            <FiUser />
            Guest
          </button>
          <button
            className='hover:bg-blue-400'
            type='button'
            onClick={signInWithGoogle}
          >
            <AiOutlineGoogle />
            Google
          </button>
        </div>
      </div>
      <p className='text-lg'>
        Made with{' '}
        <span role='img' aria-label='heart'>
          ❤️{' '}
        </span>
        by{' '}
        <a
          className='btn-focus rounded px-0.5 decoration-transparent underline-offset-2 transition
                     duration-300 hover:text-pink-400 hover:underline hover:decoration-red-200
                     focus-visible:ring-2'
          href='https://github.com/ccrsxx'
          target='_blank'
          rel='noreferrer'
        >
          ccrsxx
        </a>
      </p>
    </div>
  );
}
