import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firestore';

const getAppointments = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'appointments'));
		const appointments = querySnapshot.docs.map((doc) => {
			const data = doc.data();
			
			return {
				id: doc.id,
				title: data.title,
				startDate: data.startDate.toDate(),
				endDate: data.endDate.toDate(),
				allDay: data.allDay || false,
				rRule: data.rRule || '',
				notes: data.notes || '',
				exDate: data.exDate || '',
			};
		});
		return appointments;
	} catch (error) {
		console.error('Error fetching appointments:', error);
	}
};

export default getAppointments;
