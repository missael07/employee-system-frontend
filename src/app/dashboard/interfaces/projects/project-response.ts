import { Project } from "./project.interface";

export interface ProjectResponse {
    totalRows: number;
    data: Project[];
}