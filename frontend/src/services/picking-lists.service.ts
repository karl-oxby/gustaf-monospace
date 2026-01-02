import { apiClient } from './api.client'
import type { PickingList } from '../types'
import { formatDate } from './data.utils'

export async function getPickingLists(skip = 0, limit = 100): Promise<PickingList[]> {
    const lists = await apiClient.get<PickingList[]>(`/picking-lists/?skip=${skip}&limit=${limit}`);
    return lists.map(item => ({
        ...item,
        issueDate: formatDate(item.issueDate),
        data_url2: item.data_url2 || `https://api.merchant.gustaf.se/storage/PickingList_${item.pickinglistNo}.pdf`,
        data_url3: item.data_url3 || `https://api.merchant.gustaf.se/storage/PickingList_${item.pickinglistNo}.csv`
    }));
}

export async function getPickingListsById(settlementId: string): Promise<PickingList | undefined> {
    try {
        // Since there is no single item endpoint, we fetch the list and filter.
        // In a real app with pagination, this might not find it if it's not on the first page,
        // but for now we fetch a larger chunk or assume it's reachable.
        const list = await getPickingLists(0, 1000);
        return list.find(item => item.settlementId === settlementId);
    } catch (error) {
        console.error('Error fetching picking list by id', error);
        return undefined;
    }
}