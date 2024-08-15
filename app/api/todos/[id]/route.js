import connectMongoDB from "@/libs/mongodb";
import ToDo from "@/models/ToDoModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newDesc: desc,
    newPrio: prio,
    originalSecret: secretKey,
  } = await req.json();
  await connectMongoDB();
  await ToDo.findByIdAndUpdate(id, { title, desc, prio, secretKey });
  return NextResponse.json({ message: "ToDo updated!" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const todo = await ToDo.findOne({ _id: id });
  return NextResponse.json({ todo }, { status: 200 });
}
