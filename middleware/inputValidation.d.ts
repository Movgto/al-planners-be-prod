import type { Request, Response, NextFunction } from 'express';
declare const inputValidation: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default inputValidation;
