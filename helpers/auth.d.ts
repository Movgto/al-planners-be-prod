import { IUser } from '../models/User';
export declare const generateToken: () => string;
export declare const hashPassword: (psw: string) => Promise<string>;
export type UserDataJWT = {
    id: IUser['id'];
};
export declare const generateJWT: (user: UserDataJWT) => string;
