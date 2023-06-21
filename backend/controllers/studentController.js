const mongoose = require("mongoose");
const Student = require("../models/studentModels");

// get all students
const getAllStudents = async (req, res) => {
  try {
    const user_id = req.user._id;
    const students = await Student.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single student
const getSingleStudent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid workout ID" });
    }

    const singleStudent = await Student.findById(id);

    if (!singleStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(singleStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a single student
const createStudent = async (req, res) => {
  const { name, standard, gender, marks } = req.body;

  let emptyFields = [];

  if(!name){
    emptyFields.push("name");
  }

  if(!standard){
    emptyFields.push("standard");
  }

  if(!gender){
    emptyFields.push("gender");
  }

  if(!marks){
    emptyFields.push("marks");
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error : "please fill in all the fields",emptyFields})
  }

  try {
    const user_id = req.user._id;
    const student = await Student.create({ name, standard, gender, marks,user_id });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update single student
const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, standard, gender, marks } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid workout ID" });
    }

    const updateStudentID = await Student.findById(id);

    if (!updateStudentID) {
      return res.status(404).json({ error: "Student not found" });
    } else {
      const updateStudent = await Student.findByIdAndUpdate(
        id,
        { name, standard, gender, marks },
        { new: true }
      );
      res.status(200).json(updateStudent);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete single student
const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid workout ID" });
    }

    const deleteStudentID = await Student.findByIdAndDelete(id);

    if (!deleteStudentID) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
