import type { Request, Response } from 'express';
declare class GoogleAPIController {
    static getAuthUrl: (req: Request, res: Response) => void;
    static getEvents: (req: Request, res: Response) => Promise<void>;
    static syncEvents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static createEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static deleteEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
export default GoogleAPIController;
