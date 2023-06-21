const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const studentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    standard: {
        type: String,
        enum: ['Nursery','Lkg','Ukg','1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        required: true
    },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    user_id : {
        type : String,
        required : true
    }
},{timestamps : true})

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;