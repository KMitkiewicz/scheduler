import React, { useState, useLayoutEffect } from 'react';
import {
	addAppointment,
	getAppointments,
	deleteAppointment,
	modifyAppointment,
} from '../services/appointmentRepository';
import getLanguagePackage from '../services/getLanguagePackage';
import Paper from '@mui/material/Paper';
import {
	Scheduler,
	WeekView,
	MonthView,
	DayView,
	Appointments,
	AppointmentTooltip,
	CurrentTimeIndicator,
	Toolbar,
	ViewSwitcher,
	DateNavigator,
	AppointmentForm,
	TodayButton,
	DragDropProvider,
	ConfirmationDialog,
	AllDayPanel,
	EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import Alert from './Alert';

const SchedulerProject = () => {
	const [data, setData] = useState([]);
	const [height, setHeight] = useState(window.innerHeight);
	const [alert, setAlert] = useState('');
	const language = navigator.language;
	const languagePackage = getLanguagePackage(language);

	useLayoutEffect(() => {
		const updateHeight = () => setHeight(window.innerHeight);
		window.addEventListener('resize', updateHeight);

		const fetchAppointments = async () => {
			try {
				const appointments = await getAppointments();
				if (appointments) {
					setData(appointments);
				}
			} catch {
				setAlert('Błąd przy pobieraniu danych!');
				console.error('Błąd przy pobieraniu danych!');
			}
		};

		fetchAppointments();

		return () => window.removeEventListener('resize', updateHeight);
	}, []);

	const commitChanges = async ({ added, changed, deleted }) => {
		if (added) {
			try {
				await addAppointment(added);
				setData((prevData) => [...prevData, { ...added }]);
			} catch {
				setAlert('Błąd przy dodawniu danych!');
				console.error('Błąd przy dodawniu danych!');
			}
		}

		if (changed) {
			const appointmentId = Object.keys(changed)[0];
			const updatedAppointment = {
				...data.find((appointment) => appointment.id === appointmentId),
				...changed[appointmentId],
			};
			try {
				await modifyAppointment(updatedAppointment);
				setData((prevData) =>
					prevData.map((appointment) =>
						appointment.id === appointmentId ? updatedAppointment : appointment
					)
				);
			} catch {
				setAlert('Błąd przy edycji danych!');
				console.error('Błąd przy edycji danych!');
			}
		}

		if (deleted !== undefined) {
			try {
				await deleteAppointment(deleted);
				setData((prevData) =>
					prevData.filter((appointment) => appointment.id !== deleted)
				);
			} catch {
				setAlert('Błąd przy usuwaniu danych!');
				console.error('Błąd przy usuwaniu danych!');
			}
		}
	};

	return (
		<>
			<Alert
				setAlert={setAlert}
				alert={alert}
			/>
			<Paper>
				<Scheduler
					data={data}
					height={height}
					locale={language}>
					<ViewState />
					<EditingState onCommitChanges={commitChanges} />
					<EditRecurrenceMenu messages={languagePackage.editRecurrenceMenu} />
					<DayView name={languagePackage.dayView} />
					<WeekView name={languagePackage.weekView} />
					<MonthView name={languagePackage.monthView} />
					<Toolbar />
					<DateNavigator />
					<TodayButton messages={languagePackage.todayButton} />
					<ConfirmationDialog messages={languagePackage.confirmationButton} />
					<ViewSwitcher />
					<Appointments />
					<AllDayPanel messages={languagePackage.allDayPanel} />
					<AppointmentTooltip
						showOpenButton
						showDeleteButton
						showCloseButton
					/>
					<AppointmentForm messages={languagePackage.appointmentForm} />
					<DragDropProvider />
					<CurrentTimeIndicator
						shadePreviousCells={true}
						shadePreviousAppointments={true}
						updateInterval={1000}
					/>
				</Scheduler>
			</Paper>
		</>
	);
};

export default SchedulerProject;
