import { User } from "./user.interface";

export interface UserResponse {
    totalRows: number;
    data: User[];
}