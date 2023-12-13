import { Project } from "../projects/project.interface";

export interface Team{
    _id?: string;
    teamName: string;
    isActive: boolean;
    projectId?: Project;
}