const userModel = require("../models/user")



var getAllTeacher = (req, res, next) => {
  userModel.find({usertype:"TEACHER"}, (err, users)=>{
    if(err) {
      res.status(500).json({
        success:false,
        message : 'Internal server error'
      })
    } else {
      var teachers = []
      users.forEach((teacher)=>{
        teachers.push({
          "id" : teacher._id,
          "name" : teacher.username,
          "status" : teacher.status
        })
      })
      res.json({
        success : true,
        teachers
      })
    }
  })
}

var getTeacherStatusCount = (req,res,next) => {
  userModel.aggregate(
    [
      {$match:{usertype:"TEACHER"}},
      {$group: {_id:"$status",count:{$sum:1}} }
    ]
  )
  .then((result)=>{
      var trueCount = 0
      var falseCount = 0
      result.forEach((x)=>{
        if(x._id == true) {
          trueCount = x.count
        }
        if(x._id == false) {
          falseCount = x.count
        }
      })
      res.json({
        success:true,
        active : trueCount,
        blocked : falseCount
      })
    })
    .catch((err)=>{
      console.log(err)
      res.status(500).json({
        success:false,
        message:'Internal server error'
      })
    })
}

module.exports = {
  getTeacherStatusCount,
  getAllTeacher
}