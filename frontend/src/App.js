import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/basic/Homepage/Homepage';
import DashboradMain from './components/Dashboard/Main/dashboradMain';
import StudentRegister from './components/StudentRegister/StudentRegisterPage/studentRegister';
import AddTeacher from './components/Dashboard/AddTeacher/AddTeacher';
import AddSubject from './components/Dashboard/AddSubject/AddSubject';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path='/home' element={<DashboradMain/>} />
        <Route exact path='/register' element={<StudentRegister/>} />
        <Route exact path='/addTeacher' element={<AddTeacher/>}/>
        <Route exact path='/addSubject' element={<AddSubject/>}/>
      </Routes>
    </Router>
  );
}

export default App;
