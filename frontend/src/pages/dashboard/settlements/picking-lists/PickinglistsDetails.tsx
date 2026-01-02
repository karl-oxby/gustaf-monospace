import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../../../../assets/svg/gustaf.svg?react'
import { getPickingListsById } from '../../../../services/picking-lists.service'
import type { PickingList } from '../../../../types'
import './PickinglistsDetails.css'

export function PickinglistsDetails() {
	const { settlementId } = useParams()
	const [pickingList, setPickingList] = useState<PickingList | null>(null)

	useEffect(() => {
		if (!settlementId) return

		getPickingListsById(settlementId).then(data => {
			setPickingList(data ?? null)
		})
	}, [settlementId])

	if (!pickingList) {
		return (
			<div className='details'>
				<div className='details-container'>
					<Logo width={64} height={64} className='logo' />
					<div className='details-head'>
						<h1>Settlement ID</h1>
						<p>No picking list found with that settlement id</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='details'>
			<div className='details-container'>
				<Logo width={64} height={64} className='logo' />

				<div className='details-head'>
					<h1>Settlement ID</h1>
					<p>{settlementId}</p>
				</div>

				<div className='details-body'>
					<div className='body-row'>
						<h2>Issue date</h2>
						<p>{pickingList.issueDate}</p>
					</div>
					<div className='body-row'>
						<h2 className='status'>Tracking No.</h2>
						<p className='status'>
							<a
								href="https://www.postnord.se/en/our-tools/track-and-trace/"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => {
									navigator.clipboard.writeText(pickingList.trackingNo)
								}}
								className='tracking-link'
							>
								{pickingList.trackingNo}
							</a>
						</p>
					</div>
					<div className='body-row'>
						<h2>Picking list No.</h2>
						<p>{pickingList.pickinglistNo}</p>
					</div>
				</div>

				<div className='details-footer'>
					<a href={pickingList.data_url3} target="_blank" rel="noopener noreferrer">
						Download csv
					</a>
					<a href={pickingList.data_url2} target="_blank" rel="noopener noreferrer" className='main'>
						Download pdf
					</a>
				</div>
			</div>
		</div>
	)
}

