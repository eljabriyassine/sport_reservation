import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  const { date, time, stadium, sport, firstName, lastName, email, telephone } =
    await request.json();

  const client = await clientPromise;
  const db = client.db("sport"); // Specify the database name

  // Check if the reservation for the specific time, date, stadium, and sport already exists
  const existingReservation = await db.collection("reservations").findOne({
    date,
    time,
    stadium,
    sport,
  });

  if (existingReservation) {
    return NextResponse.json(
      { error: "Time slot already reserved" },
      { status: 400 }
    );
  }

  // Insert the new reservation into the "reservations" collection
  const newReservation = {
    date,
    time,
    stadium,
    sport,
    firstName,
    lastName,
    email,
    telephone,
  };

  const result = await db.collection("reservations").insertOne(newReservation);

  console.log(
    "New reservation inserted with ID:",
    result.insertedId.toString()
  );

  // Return only the _id of the newly inserted reservation
  return NextResponse.json(
    { id: result.insertedId.toString() }, // Returning just the _id of the new reservation
    { status: 201 }
  );
}

// Initial reservations data structure

import { reservations, timeSlots, isDayFullyReserved } from "../data";
