const userModel = require("../models/user")



var getAllStudents = (req, res, next) => {
  userModel.find({usertype:"STUDENT"}, (err, users)=>{
    if(err) {
      res.status(500).json({
        success:false,
        message : 'Internal server error'
      })
    } else {
      var students = []
      users.forEach((student)=>{
        students.push({
          "id" : student._id,
          "name" : student.username,
          "status" : student.status
        })
      })
      res.json({
        success : true,
        students
      })
    }
  })
}

module.exports = {
  getAllStudents
}