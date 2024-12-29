import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Your MongoDB client
import { ObjectId } from "mongodb";

// DELETE handler to remove a reservation by its ID
export async function DELETE(request: Request) {
  const { id } = await request.json();
  console.log("Deleting reservation with ID:", id);

  if (!id) {
    return NextResponse.json(
      { error: "Reservation ID is required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("sport");

    // Find the reservation by its ID and delete it
    const result = await db
      .collection("reservations")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Reservation successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
