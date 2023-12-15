import { Role } from "../roles/role";
import { Team } from "../teams/team.interface";

export interface User {
    _id?: string;
    fullName?: string;
    name: string;
    lastName: string;
    email: string;
    employeeNumber: number;
    teamId?: Team;
    roleId?: Role;
    isActive: boolean;
}