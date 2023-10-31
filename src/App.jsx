import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import CreateForm from './pages/CreateForm';
import FormDetails from './pages/FormDetails';

import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/form/create" element={<CreateForm/>} />
          <Route path="/form/:id" element={<FormDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
