import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../../../../assets/svg/gustaf.svg?react'
import { getSelfBillingById } from '../../../../services/self-billing.service'
import type { SelfBilling } from '../../../../types'
import './SelfbillingDetails.css'

export function SelfbillingDetails() {
	const { settlementId } = useParams()
	const [selfBilling, setSelfBilling] = useState<SelfBilling | null>(null)

	useEffect(() => {
		if (!settlementId) return

		getSelfBillingById(settlementId).then(data => {
			setSelfBilling(data ?? null)
		})
	}, [settlementId])

	if (!selfBilling) {
		return (
			<div className='details'>
				<div className='details-container'>
					<Logo width={64} height={64} className='logo' />
					<div className='details-head'>
						<h1>Settlement ID</h1>
						<p>No self-billing found with that settlement id</p>
					</div>
				</div>
			</div>
		)
	}

	const amountExVat = selfBilling.amount / 1.25
	const vatAmount = selfBilling.amount - amountExVat

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
						<p>{selfBilling.issueDate}</p>
					</div>

					<div className='body-row'>
						<h2>Due date</h2>
						<p>{selfBilling.dueDate}</p>
					</div>

					<div className='body-row'>
						<h2 className='status'>Status</h2>
						<p className='status'>{selfBilling.status}</p>
					</div>

					<div className='body-row'>
						<h2>Self billing No.</h2>
						<p>{selfBilling.selfbillingNo}</p>
					</div>
				</div>

				<div className='details-body'>
					<div className='body-row__no-uppercase'>
						<h2>Amount (excluding VAT):</h2>
						<p>{amountExVat.toFixed(2)}</p>
					</div>

					<div className='body-row__no-uppercase'>
						<h2>VAT:</h2>
						<p>{vatAmount.toFixed(2)}</p>
					</div>

					<div className='body-row__no-uppercase'>
						<h2>Amount (including VAT):</h2>
						<p>{selfBilling.amount.toFixed(2)}</p>
					</div>
				</div>

				<div className='details-footer'>
					<button>
						Download self billing
					</button>
					<button className='main'>
						Mark as paid
					</button>
				</div>
			</div>
		</div>
	)
}

