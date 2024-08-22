import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../config/firestore';

const addAppointment = async (newAppointment) => {
	try {
		let startDate = new Date(newAppointment.startDate);
		let endDate = new Date(newAppointment.endDate);

		if (newAppointment.allDay) {
			startDate.setHours(0, 0, 0, 0);
			endDate.setHours(23, 59, 59, 999);
		}

		await addDoc(collection(db, 'appointments'), {
			title: newAppointment.title,
			allDay: newAppointment.allDay || false,
			startDate: startDate,
			endDate: endDate,
			rRule: newAppointment.rRule || '',
			notes: newAppointment.notes || '',
		});
	} catch (error) {
		console.error('Error adding appointments:', error);
	}
};

export default addAppointment;
