import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/basic/Homepage/Homepage';
import DashboradMain from './components/Dashboard/Main/dashboradMain';
import StudentRegister from './components/StudentRegister/StudentRegisterPage/studentRegister';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path='/user/home' element={<DashboradMain/>} />
        <Route exact path='/register' element={<StudentRegister/>} />
      </Routes>
    </Router>
  );
}

export default App;
