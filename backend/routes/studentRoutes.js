const express = require("express");

const {getAllStudents,getSingleStudent,createStudent,updateStudent,deleteStudent} = require("../controllers/studentController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// authorization route 
router.use(requireAuth);

// get all students 
router.get("/",getAllStudents);

// get single student 
router.get("/:id",getSingleStudent)

// create a single student
router.post("/",createStudent);

// update single student 
router.patch("/:id",updateStudent)

// delete single student
router.delete("/:id",deleteStudent)

module.exports = router;