import { Response } from 'express';
import { IAvailabilityTime } from '../models/AvailabilityTime';
export declare const handleInternalError: (error: unknown, errorMsg: string, res: Response) => void;
export declare const dateFormater: (isoDate: string) => string;
export declare const formatHour: (hour: number) => string;
export declare const getDateInTimezoneFromISO: (isoDate: string) => Date;
export declare const getDateInTimezone: (date: Date) => Date;
export declare const isAvailabilityValid: (availability: IAvailabilityTime, availabilityToCompare: IAvailabilityTime) => boolean;
