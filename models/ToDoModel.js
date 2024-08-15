import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: String,
    desc: String,
    prio: String,
    secretKey: String,
  },
  {
    timestamps: true,
  }
);

const ToDoModel = mongoose.models.ToDo || mongoose.model("ToDo", todoSchema);

export default ToDoModel;
