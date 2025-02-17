export interface ILevel {
  id: string;
  name: string;
  index: number;
}

export interface ITaskType {
  id: string;
  name: string;
}

export interface ITopic {
  id: string;
  name: string;
}

export interface IFiltersResponse {
  levels: ILevel[];
  tasktypes: ITaskType[];
  topics: ITopic[];
}
