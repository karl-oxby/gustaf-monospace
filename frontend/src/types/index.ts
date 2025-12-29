export interface Invoice {
    settlementId: string;
    issueDate: string;
    dueDate: string;
    status: string;
    invoiceNo: string;
    amount: number;
    [key: string]: string | number | undefined;
}

export interface Credit {
    settlementId: string;
    issueDate: string;
    dueDate: string;
    status: string;
    creditNo: string;
    amount: number;
    [key: string]: string | number | undefined;
}

export interface PickingList {
    settlementId: string;
    issueDate: string;
    trackingNo: string;
    pickinglistNo: string;
    [key: string]: string | number | undefined;
}

export interface SelfBilling {
    settlementId: string;
    issueDate: string;
    dueDate: string;
    status: string;
    selfbillingNo: string;
    amount: number;
    [key: string]: string | number | undefined;
}
