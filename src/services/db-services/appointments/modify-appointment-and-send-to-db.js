import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../config/firestore';

const modifyAppointment = async (appointment) => {
	try {
		setDoc;
		await setDoc(doc(db, 'appointments', appointment.id), {
			...appointment,
		});
	} catch (error) {
		console.error('Error adding appointments:', error);
	}
};

export default modifyAppointment;
