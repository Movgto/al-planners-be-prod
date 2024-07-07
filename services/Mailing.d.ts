type MailingParams = {
    name: string;
    email: string;
    date: Date;
};
declare class Mailing {
    static sendAppointmentNotification: (params: Pick<MailingParams, "name" | "email" | "date">) => Promise<void>;
}
export default Mailing;
