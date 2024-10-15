import { getUsername, getUserPhoto } from '../../services';
import { VscOctoface, FiLogOut } from '../../assets';

interface ProfileProps {
  isSignedIn: boolean;
  changeModalMode: (mode: 'notSignedIn' | 'signOut') => () => void;
}

export function Profile({
  isSignedIn,
  changeModalMode
}: ProfileProps): JSX.Element {
  const [userName, userPhoto] = isSignedIn
    ? [getUsername(), getUserPhoto()]
    : ['Not signed in', undefined];

  return (
    <div className='flex w-full justify-between'>
      <div className='flex items-center gap-2 children:animate-fade'>
        {userPhoto ? (
          <a
            className='btn-focus rounded-full transition hover:brightness-90'
            href={userPhoto}
            target='_blank'
            rel='noreferrer'
          >
            <img className='h-7 w-7 rounded-full' src={userPhoto} alt='' />
          </a>
        ) : (
          <i>
            <VscOctoface className='rounded-full' size={28} />
          </i>
        )}
        <p className='font-bold' key={userName}>
          {userName}
        </p>
      </div>
      {isSignedIn && (
        <button
          className='btn-focus animate-fade rounded p-1 hover:bg-white'
          type='button'
          onClick={changeModalMode('signOut')}
        >
          <FiLogOut size={20} />
        </button>
      )}
    </div>
  );
}
