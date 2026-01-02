import type { SettlementStatus } from '../types';

interface FinancialItem {
    amount?: number | string;
    total_price?: number | string;
    totalPrice?: number | string;
    [key: string]: unknown;
}

export function normalizeData(data: unknown): Record<string, unknown> {
    if (Array.isArray(data)) {
        return data.length > 0 ? (data[0] as Record<string, unknown>) : {};
    }
    return (data as Record<string, unknown>) || {};
}

export function calculateAmount(data: unknown): number {
    if (!data) return 0;

    // If it's a dictionary/object
    if (typeof data === 'object' && !Array.isArray(data)) {
        const item = data as FinancialItem;
        const amount = item.amount ?? item.total_price ?? item.totalPrice;
        if (amount !== undefined) {
            return typeof amount === 'number' ? amount : parseFloat(String(amount)) || 0;
        }
    }
    
    // If it's an array of items
    if (Array.isArray(data)) {
        return data.reduce((sum: number, rawItem: unknown) => {
            const item = rawItem as FinancialItem;
            const price = item.total_price || item.totalPrice || item.amount || 0;
            return sum + (typeof price === 'number' ? price : parseFloat(String(price)) || 0);
        }, 0);
    }
    
    return 0;
}

export function formatStatus(status: SettlementStatus): string {
    if (!status) return '';
    // Capitalize first letter
    return status.charAt(0).toUpperCase() + status.slice(1);
}

export function calculateDueDate(issueDate: string): string {
    if (!issueDate) return '';
    const date = new Date(issueDate);
    if (isNaN(date.getTime())) return issueDate;
    
    // Add 1 month
    const targetMonth = date.getMonth() + 1;
    date.setMonth(targetMonth);
    
    // Check if we skipped a month (e.g. Jan 31 -> Mar 3) due to day overflow
    // If so, set to last day of previous month
    if (date.getMonth() !== targetMonth % 12) {
        date.setDate(0);
    }
    
    return date.toISOString();
}

export function formatDate(dateString: string): string {
    if (!dateString) return '';
    // Replace T with space and remove everything from the dot (milliseconds/Z) onwards
    return dateString.replace('T', ' ').split('.')[0].replace('Z', '');
}
