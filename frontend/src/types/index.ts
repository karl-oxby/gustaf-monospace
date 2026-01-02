export const SettlementStatus = {
    WAITING: 'waiting',
    INVOICED: 'invoiced',
    CANCELLED: 'cancelled',
    PAID: 'paid'
} as const;

export type SettlementStatus = typeof SettlementStatus[keyof typeof SettlementStatus];

export const PaymentType = {
    PI: 'PI',
    SB: 'SB',
    CR: 'CR',
    CL: 'CL'
} as const;

export type PaymentType = typeof PaymentType[keyof typeof PaymentType];

export interface SettlementItem {
    id: number;
    payment_id: string;
    status: SettlementStatus;
    payment_type: PaymentType | null;
    ownable_type: string;
    ownable_id: string;
    data_url?: string;
    data_url2?: string;
    data_url3?: string;
    data: any;
    created_at?: string;
    updated_at?: string;
}

export interface Settlement {
    id: string;
    issue_date: string;
    due_date: string;
    status: SettlementStatus;
    data: any;
    items: SettlementItem[];
    created_at?: string;
    updated_at?: string;
}

export interface Invoice {
    settlementId: string;
    issueDate: string;
    dueDate: string;
    status: string;
    invoiceNo: string;
    amount: number;
    data_url?: string;
    [key: string]: string | number | undefined | any;
}

export interface Credit {
    settlementId: string;
    issueDate: string;
    dueDate: string;
    status: string;
    creditNo: string;
    amount: number;
    [key: string]: string | number | undefined | any;
}

export interface PickingList {
    settlementId: string;
    issueDate: string;
    trackingNo: string;
    pickinglistNo: string;
    data_url2?: string;
    data_url3?: string;
    [key: string]: string | number | undefined | any;
}

export interface SelfBilling {
    settlementId: string;
    issueDate: string;
    dueDate: string;
    status: string;
    selfbillingNo: string;
    amount: number;
    [key: string]: string | number | undefined | any;
}
