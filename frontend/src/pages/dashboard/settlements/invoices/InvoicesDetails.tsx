import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../../../../assets/svg/gustaf.svg?react'
import { getInvoicesById } from '../../../../services/invoices.service'
import type { Invoice } from '../../../../types'
import './InvoicesDetails.css'

export function InvoicesDetails() {
	const { settlementId } = useParams()
	const [invoice, setInvoice] = useState<Invoice | null>(null)

	useEffect(() => {
		if (!settlementId) return

		getInvoicesById(settlementId).then(data => {
			setInvoice(data ?? null)
		})
	}, [settlementId])

	if (!invoice) {
		return (
			<div className='details'>
				<div className='details-container'>
					<Logo width={64} height={64} className="logo" />
					<div className='details-head'>
						<h1>Settlement ID</h1>
						<p>No invoice found with that settlement id</p>
					</div>
				</div>
			</div>
		)
	}

	const amountExVat = invoice.amount / 1.25
	const vatAmount = invoice.amount - amountExVat

	return (
		<div className='details'>
			<div className='details-container'>
				<Logo width={64} height={64} className='logo'/>
				<div className='details-head'>
					<h1>Settlement ID</h1>
					<p>{settlementId}</p>
				</div>
				<div className='details-body'>
					<div className='body-row'>
						<h2>Issue date</h2>
						<p>{invoice.issueDate}</p>
					</div>
					<div className='body-row'>
						<h2>Due date</h2>
						<p>{invoice.dueDate}</p>
					</div>
					<div className='body-row'>
						<h2 className='status'>Status</h2>
						<p className='status'>{invoice.status}</p>
					</div>
					<div className='body-row'>
						<h2>Invoice No.</h2>
						<p>{invoice.invoiceNo}</p>
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
						<p>{invoice.amount.toFixed(2)}</p>
					</div>
				</div>
				<div className='details-footer'>
					<button>
						Download invoice
					</button>
					<button className='main'>
						Mark as paid
					</button>
				</div>
			</div>
		</div>
	) 
}

