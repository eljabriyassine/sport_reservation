import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("sport"); // Specify the database name
    // Fetch all reservations from the "reservations" collection
    const reservations = await db.collection("reservations").find({}).toArray();

    return NextResponse.json(reservations); // Send 
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching reservations" },
      { status: 500 }
    );
  }
}
