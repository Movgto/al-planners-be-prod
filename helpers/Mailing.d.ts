type MailingProps = {
    name: string;
    date: string;
    hour: string;
};
export declare const HtmlForEventNotification: (props: Pick<MailingProps, "name" | "hour" | "date">) => import("react/jsx-runtime").JSX.Element;
export {};
