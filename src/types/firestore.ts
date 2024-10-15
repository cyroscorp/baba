import type { TaskType, ProjectType } from './forms';

export type FirestoreData = [TaskType[], ProjectType[]];
export type FirestoreElement = {
  data: TaskType[] | ProjectType[];
  username: string;
  timestamp: string;
};
