// import Datepicker from "tailwind-datepicker-react";


const options = {
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date("2030-01-01"),
	minDate: new Date("2000-01-01"),
	datepickerClassNames: "-translate-x-1/3 mt-3",
	defaultDate: new Date(),
	language: "en",
}

const DatePicker = ({ops, handleChange, show, setShow}) => {
    return (
		<h2>Zaman</h2>
	)
	// <Datepicker options={{...options, ...ops}} onChange={handleChange} show={show} setShow={setShow} />;
}

export default DatePicker;
