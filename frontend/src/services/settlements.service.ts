import { apiClient } from './api.client';
import type { Settlement, SettlementStatus } from '../types';

export async function getSettlements(skip = 0, limit = 100): Promise<Settlement[]> {
    return apiClient.get<Settlement[]>(`/settlements/?skip=${skip}&limit=${limit}`);
}

export async function getSettlementById(id: string): Promise<Settlement> {
    return apiClient.get<Settlement>(`/settlements/${id}`);
}

export async function createSettlement(data: Partial<Settlement>): Promise<Settlement> {
    return apiClient.post<Settlement>('/settlements/', data);
}

export async function updateSettlement(id: string, updates: { status?: SettlementStatus; data?: unknown }): Promise<Settlement> {
    return apiClient.patch<Settlement>(`/settlements/${id}`, updates);
}
