import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../config/firestore';

const deleteAppointment = async (appointment) => {
	try {
		await deleteDoc(doc(db, 'appointments', appointment));
	} catch (error) {
		console.error('Error adding appointments:', error);
	}
};

export default deleteAppointment;
