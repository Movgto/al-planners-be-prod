import mongoose, { Document } from 'mongoose';
interface IEventType extends Document {
    name: string;
    duration: number;
}
declare const EventType: mongoose.Model<IEventType, {}, {}, {}, mongoose.Document<unknown, {}, IEventType> & IEventType & Required<{
    _id: unknown;
}>, any>;
export default EventType;
