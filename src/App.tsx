import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./App.css";
import { CourseForm } from "./pages/CourseForm/CourseForm";
import { theme } from "./theme/index";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CourseForm />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
