import connectMongoDB from "@/libs/mongodb";
import ToDo from "@/models/ToDoModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, desc, prio, secretKey } = await req.json();
  await connectMongoDB();
  await ToDo.create({ title, desc, prio, secretKey });
  return NextResponse.json({ message: "ToDo Created!" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const todo = await ToDo.find();
  return NextResponse.json({ todo });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ToDo.findByIdAndDelete(id);
  return NextResponse.json({ message: "ToDo Deleted!" }, { status: 200 });
}
