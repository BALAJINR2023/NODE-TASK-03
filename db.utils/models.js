import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  id: {
    type: "string",
    required: true,
  },
  Name: {
    type: "string",
    required: true,
  },
  Course: {
    type: "string",
    required: true,
  },
  Batch: {
    type: "string",
    required: true,
  },
  students: {
    type: "array",
    required: true,
  },
});

// Model creation using schema
const teacherModel = new mongoose.model("teacher", teacherSchema, "teachers");

export {teacherModel};