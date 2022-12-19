import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from './context/AuthContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
function App() {
  return (
    <SessionContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
