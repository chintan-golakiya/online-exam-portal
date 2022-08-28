import React from 'react';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import StudentRegisterForm from '../../templates/studentRegisterForm/studentRegisterForm';


class StudentRegisterPage extends React.Component {
  render() {
    return(
      <div>
        <AlertBox/>
        Student Register
        <StudentRegisterForm/>
      </div>
    )
  }
}


export default StudentRegisterPage;

