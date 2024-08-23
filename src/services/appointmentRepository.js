import {
	collection,
	doc,
	addDoc,
	deleteDoc,
	getDocs,
	setDoc,
} from 'firebase/firestore';
import { db } from '../config/firestore';

export const addAppointment = async (newAppointment) => {
	const startDate = new Date(newAppointment.startDate);
	const endDate = new Date(newAppointment.endDate);

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
};

export const deleteAppointment = async (appointment) => {
	await deleteDoc(doc(db, 'appointments', appointment));
};

export const getAppointments = async () => {
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
};

export const modifyAppointment = async (appointment) => {
	setDoc;
	await setDoc(doc(db, 'appointments', appointment.id), {
		...appointment,
	});
};
