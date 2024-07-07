import type { Request, Response } from 'express';
declare class EventTypesController {
    static getEventTypes: (req: Request, res: Response) => Promise<void>;
    static getEventType: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static createEventType: (req: Request, res: Response) => Promise<void>;
    static deleteEventType: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
export default EventTypesController;
