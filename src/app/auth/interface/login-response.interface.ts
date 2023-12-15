import { LoggedUser } from "./login.interface";

export interface LoginResponse {
    token: string;
    user:  LoggedUser;
}