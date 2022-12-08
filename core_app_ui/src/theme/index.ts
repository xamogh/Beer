import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

let theme = createTheme({
    palette: {
        primary: indigo,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        button: {
            textTransform: "capitalize",
        },
        fontFamily: [
            "-apple-system",
            "Poppins",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

theme = createTheme(theme, {
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                    },
                },
            },
        },
    },
});

export default theme;
