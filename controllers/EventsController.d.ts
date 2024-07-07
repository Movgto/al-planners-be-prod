import { Request, Response } from 'express';
declare class EventsController {
    static getEvents: (req: Request, res: Response) => Promise<void>;
    static getEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static createEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
export default EventsController;
