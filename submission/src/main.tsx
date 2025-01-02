import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        // Optionally customize other colors as needed, e.g.:
        // primary: {
        //   main: '#90caf9',
        // },
        // background: {
        //   default: '#121212',
        // },
    },
});

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>
)