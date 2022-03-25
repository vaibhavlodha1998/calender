import "./App.css";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateFnsUtils from "@date-io/date-fns";
import BasicDateTimePicker from "./DateTime";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={DateAdapter}>
        <BasicDateTimePicker />
      </LocalizationProvider>
    </div>
  );
}

export default App;
