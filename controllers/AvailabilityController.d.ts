import { Request, Response } from 'express';
declare class AvailabilityController {
    static createAvailableTime: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static getAvailableTime: (req: Request, res: Response) => Promise<void>;
    static deleteAvailableTime: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static getAvailableTimes: (req: Request, res: Response) => Promise<void>;
}
export default AvailabilityController;
