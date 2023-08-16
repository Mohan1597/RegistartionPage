import logo from './logo.svg';
import './App.css';
import Login from './Components/login';
import SignUp from './Components/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Fragment } from 'react';

function App() {
  return (
   <Router>
        <Fragment>
          <Routes>
            <Route path="" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
         </Routes>
        </Fragment>
   </Router>
  );
}

export default App;
