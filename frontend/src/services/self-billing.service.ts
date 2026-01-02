import { getSettlements, getSettlementById } from './settlements.service'
import { PaymentType } from '../types'
import type { SelfBilling, Settlement } from '../types'
import { normalizeData, formatStatus, calculateAmount, calculateDueDate, formatDate } from './data.utils'

function mapToSelfBilling(settlement: Settlement): SelfBilling | null {
    const data = normalizeData(settlement.data);
    const sbItem = settlement.items.find(i => i.payment_type === PaymentType.SB);
    const hasSelfBillingNo = !!(data.selfbillingNo as string) || !!sbItem?.payment_id;

    if (!sbItem && !hasSelfBillingNo) {
        return null;
    }

    return {
        settlementId: settlement.id,
        issueDate: formatDate(settlement.issue_date),
        dueDate: formatDate(calculateDueDate(settlement.issue_date)),
        status: formatStatus(settlement.status),
        selfbillingNo: (data.selfbillingNo as string) || sbItem?.payment_id || '',
        amount: calculateAmount(sbItem ? sbItem.data : settlement.data),
        ...data
    };
}

export async function getSelfBilling(): Promise<SelfBilling[]> {
    const settlements = await getSettlements(0, 1000);
    return settlements
        .map(mapToSelfBilling)
        .filter((item): item is SelfBilling => item !== null);
}

export async function getSelfBillingById(settlementId: string): Promise<SelfBilling | undefined> {
    try {
        const settlement = await getSettlementById(settlementId);
        return mapToSelfBilling(settlement) || undefined;
    } catch (error) {
        console.error('Error fetching self billing by id', error);
        return undefined;
    }
}