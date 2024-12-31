import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId for working with MongoDB IDs

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Get the "id" parameter from the URL

    if (!id) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sport"); // Specify the database name

    // Fetch a single reservation by its ID
    const reservation = await db.collection("reservations").findOne({
      _id: new ObjectId(id),
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reservation); // Send the single reservation
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the reservation: " + error },
      { status: 500 }
    );
  }
}
