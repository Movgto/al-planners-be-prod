import mongoose, { Document, Schema } from "mongoose";
interface IEvent extends Document {
    summary: string;
    start: {
        dateTime: string;
    };
    end: {
        dateTime: string;
    };
    sentToCalendar: boolean;
    attendee: {
        name: string;
        email: string;
    };
}
export declare const eventSchema: Schema;
declare const Event: mongoose.Model<IEvent, {}, {}, {}, mongoose.Document<unknown, {}, IEvent> & IEvent & Required<{
    _id: unknown;
}>, any>;
export default Event;
