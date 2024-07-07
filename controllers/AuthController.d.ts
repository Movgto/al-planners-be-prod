import { Request, Response } from 'express';
declare class AuthController {
    static adminLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static adminSignUp: (req: Request, res: Response) => Promise<void>;
    static getAdmin: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
}
export default AuthController;
