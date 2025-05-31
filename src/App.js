import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './source/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contactinfo from './source/Contactinfo';
import Adminloginpage from './source/Adminloginpage';
import Customerslogin from './source/Customerslogin';
import Adminhomepage from './source/Adminhomepage';
import Customerregister from './source/Customerregister';
import Customerdetails from './source/Customerdetails';
import Customerhomepage from './source/Customerhomepage';
import UploadQuestions from './source/UploadQuestions';
import AdminQuestions from './source/AdminQuestions';
import CustomerQuestion from './source/CustomerQuestion';
import CustomerNavbar from './source/CustomerNavbar';
import Adminresultsubmission from './source/Adminresultsubmission';
import Adminresultdata from './source/Adminresultdata';
import Securedata from './source/Securedata';

function App() {

  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  return (
    <div>
         <Routes>
        
         <Route path="/" element={<Home />} />
         <Route path="contactinfo" element={<Contactinfo />} />
         <Route path="adminlogin" element={<Adminloginpage />} />
         <Route path="login" element={<Customerslogin />} />
         <Route path="adminhomepage" element={<Adminhomepage />} />
         <Route path="customerregister" element={<Customerregister />} />
         <Route path="customerdetails" element={<Customerdetails />} />
         <Route path="customerhomepage" element={<Customerhomepage />} />
         <Route path="uploadquestions" element={<UploadQuestions />} />
         <Route path="adminquestions" element={<AdminQuestions />} />
         <Route path="customerquestions" element={<CustomerQuestion />} />
         <Route path="adminresultsubmission" element={<Adminresultsubmission />} />
         <Route path="adminresultdata" element={<Adminresultdata />} />
         <Route path="securedata" element={<Securedata />} />
         </Routes>
    </div>
  );
}

export default App;
