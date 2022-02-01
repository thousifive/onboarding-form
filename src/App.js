import "./App.css";
import Home from "./components/Home";
import Icon from "./EdenIcon.ico";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#664DE5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="card-main">
          <div className="title">
            <img src={Icon} alt="Eden Icon" />
            <h1>Eden</h1>
          </div>
          <div className="form">
            <Home />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
