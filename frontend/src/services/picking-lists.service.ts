import pickingListsData from '../api/pickingLists.json'

export async function getPickingLists() {
	return Promise.resolve(pickingListsData)
}

export async function getPickingListsById(settlementId: string) {
	const list = await getPickingLists()
	return list.find(item => item.settlementId === settlementId)
}

