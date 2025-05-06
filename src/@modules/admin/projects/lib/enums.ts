export enum ENUM_PROJECTS_STATUS_TYPES {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
}

export type TProjectsStatusType = keyof typeof ENUM_PROJECTS_STATUS_TYPES;
export const projectsStatusTypes = Object.values(ENUM_PROJECTS_STATUS_TYPES);
