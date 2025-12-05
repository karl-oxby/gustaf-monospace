import { useParams } from 'react-router-dom'

export function SelfbillingDetails() {
  const { settlementId } = useParams()

  return <p>{settlementId}</p> 
}


