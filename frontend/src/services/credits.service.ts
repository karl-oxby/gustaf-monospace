import creditsData from '../api/credits.json'

export async function getCredits() {
	return Promise.resolve(creditsData)
}

export async function getCreditsById(settlementId: string) {
	const list = await getCredits()
	return list.find(item => item.settlementId === settlementId)
}

