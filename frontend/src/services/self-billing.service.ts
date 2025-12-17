import selfBillingData from '../api/selfBilling.json'

export async function getSelfBilling() {
	return Promise.resolve(selfBillingData)
}

export async function getSelfBillingById(settlementId: string) {
	const list = await getSelfBilling()
	return list.find(item => item.settlementId === settlementId)
}

