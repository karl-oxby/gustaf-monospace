import { getSettlements, getSettlementById } from './settlements.service'
import { PaymentType } from '../types'
import type { Invoice, Settlement } from '../types'
import { normalizeData, formatStatus, calculateAmount, calculateDueDate, formatDate } from './data.utils'

function mapToInvoice(settlement: Settlement): Invoice | null {
    const data = normalizeData(settlement.data);
    const invoiceItem = settlement.items.find(i => i.payment_type === PaymentType.PI);
    const hasInvoiceNo = !!(data.invoiceNo as string) || !!invoiceItem?.payment_id;

    if (!invoiceItem && !hasInvoiceNo) {
        return null;
    }

    return {
        settlementId: settlement.id,
        issueDate: formatDate(settlement.issue_date),
        dueDate: formatDate(calculateDueDate(settlement.issue_date)),
        status: formatStatus(settlement.status),
        invoiceNo: (data.invoiceNo as string) || invoiceItem?.payment_id || '',
        amount: calculateAmount(invoiceItem ? invoiceItem.data : settlement.data),
        data_url: invoiceItem?.data_url || `https://api.merchant.gustaf.se/storage/${(data.invoiceNo as string) || invoiceItem?.payment_id}.pdf`,
        ...data
    };
}

export async function getInvoices(): Promise<Invoice[]> {
    const settlements = await getSettlements(0, 1000);
    return settlements
        .map(mapToInvoice)
        .filter((item): item is Invoice => item !== null);
}

export async function getInvoicesById(settlementId: string): Promise<Invoice | undefined> {
    try {
        const settlement = await getSettlementById(settlementId);
        return mapToInvoice(settlement) || undefined;
    } catch (error) {
        console.error('Error fetching invoice by id', error);
        return undefined;
    }
}