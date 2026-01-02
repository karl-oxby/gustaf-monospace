import { getSettlements, getSettlementById } from './settlements.service'
import { PaymentType } from '../types'
import type { Credit, Settlement } from '../types'
import { normalizeData, formatStatus, calculateAmount, calculateDueDate, formatDate } from './data.utils'

function mapToCredit(settlement: Settlement): Credit | null {
    const data = normalizeData(settlement.data);
    const creditItem = settlement.items.find(i => i.payment_type === PaymentType.CR);
    const hasCreditNo = !!(data.creditNo as string) || !!creditItem?.payment_id;

    if (!creditItem && !hasCreditNo) {
        return null;
    }

    return {
        settlementId: settlement.id,
        issueDate: formatDate(settlement.issue_date),
        dueDate: formatDate(calculateDueDate(settlement.issue_date)),
        status: formatStatus(settlement.status),
        creditNo: (data.creditNo as string) || creditItem?.payment_id || '',
        amount: calculateAmount(creditItem ? creditItem.data : settlement.data),
        ...data
    };
}

export async function getCredits(): Promise<Credit[]> {
    const settlements = await getSettlements(0, 1000); // Fetch reasonable amount
    return settlements
        .map(mapToCredit)
        .filter((item): item is Credit => item !== null);
}

export async function getCreditsById(settlementId: string): Promise<Credit | undefined> {
    try {
        const settlement = await getSettlementById(settlementId);
        return mapToCredit(settlement) || undefined;
    } catch (error) {
        console.error('Error fetching credit by id', error);
        return undefined;
    }
}