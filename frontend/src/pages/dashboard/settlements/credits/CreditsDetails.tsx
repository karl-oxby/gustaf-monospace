import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../../../../assets/svg/gustaf.svg?react'
import { getCreditsById } from '../../../../services/credits.service'
import type { Credit } from '../../../../types'
import './CreditsDetails.css'

export function CreditsDetails() {
	const { settlementId } = useParams()
	const [credit, setCredit] = useState<Credit | null>(null)

	useEffect(() => {
    		if (!settlementId) return

    			getCreditsById(settlementId).then(data => {
      			setCredit(data ?? null)
    		})
  	}, [settlementId])

  	if (!credit) {
    		return (
      			<div className='details'>
        			<div className='details-container'>
          				<Logo width={64} height={64} className='logo' />
          				<div className='details-head'>
            					<h1>Settlement ID</h1>
            					<p>No credit found with that settlement id</p>
         				</div>
        			</div>
      			</div>
    		)
  	}

	const amountExVat = credit.amount / 1.25
	const vatAmount = credit.amount - amountExVat

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
            					<p>{credit.issueDate}</p>
          				</div>
					<div className='body-row'>
						<h2>Due date</h2>
						<p>{credit.dueDate}</p>
					</div>
          				<div className='body-row'>
            					<h2 className='status'>Status</h2>
            					<p className='status'>{credit.status}</p>
          				</div>
          				<div className='body-row'>
            					<h2>Credit No.</h2>
            					<p>{credit.creditNo}</p>
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
						<p>{credit.amount.toFixed(2)}</p>
					</div>
        			</div>

        			<div className='details-footer'>
          				<button>
            					Download credit
          				</button>
					<button className='main'>
						Mark as paid
					</button>
        			</div>
      			</div>
		</div>
	)
}

