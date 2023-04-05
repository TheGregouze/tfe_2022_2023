const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());  //req.body



// ROUTES //
//create a student
app.post("/student", async(req,res) => {
    try {    
        const { student_name } = req.body;
        const newStudent = await pool.query(
            "INSERT INTO students (student_name) VALUES($1) RETURNING *",
            [student_name]
            );

            res.json(newStudent.rows[0]);
    } catch (err) {
        console.error(err.message);
     }
});

//get all students
app.get("/student", async(req,res) => {
    try {
        const allStudents = await pool.query("SELECT * FROM students;");
        res.json(allStudents.rows);
    } catch (err) {
        console.error(err.message);
     }
});

//get a student by id
app.get("/student/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const student = await pool.query("SELECT * FROM students WHERE student_id = $1;", 
        [id]
        );
        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
     }
})

//update a student
app.put("/student/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {student_name} = req.body;
        const updateStudent = await pool.query("UPDATE students SET student_name = $1 WHERE student_id = $2",
        [student_name, id]
        );
        res.json("Students was updated");
    } catch (err) {
        console.error(err.message);
     }
})

//delete a student
app.delete("/student/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteStudent = await pool.query("DELETE FROM students WHERE student_id = $1",
        [id]
        );
        res.json("Student was deleted!")
    } catch (err) {
        console.error(err.message);
     }
})




app.listen(5000, () => {
    console.log("server has started on port 5000");
});