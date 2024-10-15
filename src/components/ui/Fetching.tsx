import { VscLoading } from '../../assets';

interface FetchingProps {
  content?: boolean;
  sidebar?: boolean;
}

export function Fetching({ sidebar, content }: FetchingProps): JSX.Element {
  return (
    <div
      className={`${
        content && 'h-full items-center'
      } flex w-full animate-fade justify-center`}
    >
      <i
        className={`${
          content ? 'text-6xl' : sidebar ? 'text-2xl' : 'text-4xl'
        } animate-spin`}
      >
        <VscLoading />
      </i>
    </div>
  );
}
