import './Login.css'

export function Login() {
	return (
		<div className=''>
			<form>
				<label htmlFor='username'>
					Username:
				</label>
				<input type='text' id='username' />
				<label htmlFor='password'>
					Password:
				</label>
				<input type='password' id='password' />
			</form>
		</div>
	)
}

