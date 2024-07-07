import mongoose, { Document } from "mongoose";
export interface IAvailabilityTime extends Document {
    startTime: string;
    endTime: string;
}
declare const AvailabilityTime: mongoose.Model<IAvailabilityTime, {}, {}, {}, mongoose.Document<unknown, {}, IAvailabilityTime> & IAvailabilityTime & Required<{
    _id: unknown;
}>, any>;
export default AvailabilityTime;
