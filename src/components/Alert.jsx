import React from 'react';
import '../style/alert.css';

const Alert = (props) => {
	const { alert, setAlert } = props;
	const [showAlert, setShowAlert] = React.useState(false);

	React.useEffect(() => {
		setShowAlert(true);
		const timer = setTimeout(() => {
			setShowAlert(false);
			setAlert('');
		}, 4000);

		return () => clearTimeout(timer);
	}, [alert, setAlert]);

	if (showAlert && alert?.length > 0) {
		return (
			<div className='alert'>
				<h2 className='alert-title'>Uwaga!</h2>
				<p className='message'>{alert}</p>
				<hr className='loading-bar' />
			</div>
		);
	}
};

export default Alert;
