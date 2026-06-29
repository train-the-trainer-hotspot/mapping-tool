import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#008dd0",
      light: "#0083c1",
    },
    secondary: {
      main: "#AEBD0B",
      light: "rgba(174, 189, 11, 0.69)",
    },
    error: {
      main: "#ff3638",
    },
    warning: {
      main: "#ffd92a",
    },
    info: {
      main: "#0083c1",
    },
    success: {
      main: "#52af34",
    },
    grey: {
      100: "#eeedec",
      300: "#b8b8b8",
      500: "#939393",
      600: "#5d5d5d",
      700: "#444444",
    },
  },
  typography: {
    fontFamily: `"Aller", "Helvetica Neue", Helvetica, Arial, sans-serif`,
    h1: { fontSize: "2.2rem", fontWeight: 300, color: "#AEBD0B" },
    h2: { fontSize: "1.8rem", fontWeight: 300 },
    h3: { fontSize: "1.5rem", fontWeight: 300 },
    h4: { fontSize: "1.3rem", fontWeight: 300, color: "#008dd0" },
    h5: { fontSize: "1.1rem", fontWeight: 300, color: "#008dd0" },
    h6: { fontSize: "1rem", fontWeight: 300 },
    body1: { fontSize: "16px", lineHeight: 1.6 },
    body2: { fontSize: "14px" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 768,
      lg: 996,
      xl: 1400,
    },
  },
});
