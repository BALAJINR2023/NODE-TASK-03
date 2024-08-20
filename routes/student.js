import express from 'express';
import {db} from '../db.utils/Mongo.js';

const studentRouter = express.Router();

const collection = db.collection('students');

studentRouter.get('/', async (req, res) => {
    try {
    const data = await collection.find({}).toArray();
    // Send the retrieved data as the response
        res.send(data);
    } catch (error) {
        console.error('Error fetching students:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching students' });
    }
});
// API to show all students for a particular mentor
studentRouter.get('/students-for-mentor/:teacherId', async (req, res) => {
  const { teacherId } = req.params;

  try {
      // Fetch students associated with the given mentor ID
      const students = await collection.find({ teacherId: teacherId }).toArray();

      if (students.length === 0) {
          return res.status(404).send({ msg: 'No students found for this mentor' });
      }

      res.send(students);
  } catch (error) {
      console.error('Error fetching students for mentor:', error.message);
      res.status(500).send({ error: 'An error occurred while fetching students' });
  }
});
//API to creat a student 
studentRouter.post("/", async (req, res) => {
    const { body } = req;
    await collection.insertOne({
      ...body,
      id: Date.now().toString(),
      teacherId: null,
    });
    res.send({ msg: "Insert Student Success" });
  });

  studentRouter.put("/:studentId", async (req, res) => {
    const { studentId } = req.params;
    const { body } = req;
    if (Object.keys(body).length > 0) {
      await collection.updateOne({ id: studentId }, { $set: { ...body, id: studentId } });
      res.send({ msg: "Updated Student Successfully" });
    } else {
      res.status(400).send({ msg: "Please Enter a Student Data" });
    }
  });

  studentRouter.delete("/:studentId", async (req, res) => {
    const { studentId } = req.params;
    const stuObj = await collection.findOne({ id: studentId });
  
    if (stuObj) {
      await collection.deleteOne({ id: studentId });
      res.send({ msg: "Deleted Student Successfully" });
    } else {
      res.status(404).send({ msg: "Student Not Found" });
    }
  });
// API to Assign or Change Mentor for particular Student: Select One Student and Assign one Mentor
  studentRouter.patch("/assign-teacher/:studentId", async (req, res) => {
    const { body } = req;
    const { teacherId } = body;
    const { studentId } = req.params;
  // console.log(studentId,teacherId);
    // Check whether the student exists
    const stuObj = await collection.findOne({ id: studentId });
    const teachObj = await db.collection("teachers").findOne({ id: teacherId });
    if (stuObj && teachObj) {
      // Update the teacher in student collection
      await collection.updateOne({ id: studentId }, { $set: { teacherId } });
  
      //  add student in teacher collection
      await db
        .collection("teachers")
        .updateOne(
          { id: teacherId },
          { $set: { students: [...teachObj.students, studentId] } }
        );
      res.send({ msg: "Teacher Assigned Successfully" });
    } else {
      res.status(400).send({ msg: "Please check Student & Teacher Details" });
    }
  });
export default studentRouter;