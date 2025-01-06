import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("sport"); // Specify the database name
    // Fetch all reservations from the "reservations" collection reversed by id
    const reservations = await db
      .collection("reservations")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    // Return the reservations data with a revalidation interval of 60 seconds
    const response = NextResponse.json(reservations);

    // Add a revalidation header to indicate when to revalidate the data
    response.headers.set(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate"
    );

    return response; // Send the response with revalidation
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching reservations" + error },
      { status: 500 }
    );
  }
}
