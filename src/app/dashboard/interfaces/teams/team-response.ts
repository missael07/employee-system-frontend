import { Team } from "./team.interface";

export interface TeamResponse {
    totalRows: number;
    data: Team[];
}