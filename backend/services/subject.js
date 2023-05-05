const subjectModel = require("../models/subject")


var getAllSubject = (req, res, next) => {
  subjectModel.find({}, (err, sub)=>{
    if(err) {
      res.status(500).json({
        success:false,
        message : 'Internal server error'
      })
    } else {
      var subjects = []
      sub.forEach((subject)=>{
        subjects.push({
          "id" : subject._id,
          "subject" : subject.name,
          "status" : subject.status
        })
      })
      res.json({
        success : true,
        subjects : subjects
      })
    }
  })
}

var getAllActiveSubject = (req, res, next) => {
  subjectModel.find({status:true}, (err, sub)=>{
    if(err) {
      res.status(500).json({
        success:false,
        message : 'Internal server error'
      })
    } else {
      var subjects = []
      sub.forEach((subject)=>{
        subjects.push({
          "id" : subject._id,
          "subject" : subject.name,
          "status" : subject.status
        })
      })
      res.json({
        success : true,
        subjects : subjects
      })
    }
  })
}

var getStatusCount = (req,res,next) => {
  subjectModel.aggregate(
    [
      {$match:{}},
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
  getAllSubject,
  getStatusCount,
  getAllActiveSubject
}