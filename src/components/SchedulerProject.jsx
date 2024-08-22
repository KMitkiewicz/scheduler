import React, { useState, useEffect } from 'react';
import addAppointment from '../services/db-services/appointments/add-appointment-to-db';
import getAppointments from '../services/db-services/appointments/get-appointments-from-db';
import deleteAppointment from '../services/db-services/appointments/delete-appointment-from-db';
import modifyAppointment from '../services/db-services/appointments/modify-appointment-and-send-to-db';
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

import getLanguagePackage from '../services/language-services/get-language-package';

const SchedulerProject = () => {
	const [data, setData] = useState([]);
	const [height, setHeight] = useState(window.innerHeight);
	const language = navigator.language;
	const languagePackage = getLanguagePackage(language);

	useEffect(() => {
		const updateHeight = () => setHeight(window.innerHeight);
		window.addEventListener('resize', updateHeight);

		const fetchAppointments = async () => {
			const appointments = await getAppointments();
			if (appointments) {
				setData(appointments);
			}
		};

		fetchAppointments();

		return () => window.removeEventListener('resize', updateHeight);
	}, []);

	const commitChanges = async ({ added, changed, deleted }) => {
		if (added) {
			await addAppointment(added);
		}

		if (changed) {
			const appointmentId = Object.keys(changed)[0];
			const updatedAppointment = {
				...data.find((appointment) => appointment.id === appointmentId),
				...changed[appointmentId],
			};
			await modifyAppointment(updatedAppointment);
		}

		if (deleted !== undefined) {
			await deleteAppointment(deleted);
		}

		const updatedAppointments = await getAppointments();
		if (updatedAppointments) {
			setData(updatedAppointments);
		}
	};

	return (
		<div>
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
		</div>
	);
};

export default SchedulerProject;
