// POST handler to add a new reservation
import { reservations, timeSlots, isDayFullyReserved } from "../data";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { date, time, stadium, sport, firstName, lastName, email, telephone } =
    await request.json();

  console.log("hello");
  //   console(await request.json());
  console.log("hello");
  console.log(
    date,
    time,
    stadium,
    sport,
    firstName,
    lastName,
    email,
    telephone
  );
  console.log("hello");

  //   Check if the day, stadium, and sport are fully reserved
  if (isDayFullyReserved(date, stadium, sport)) {
    return NextResponse.json(
      { error: "Date is fully reserved for this sport and stadium" },
      { status: 400 }
    );
  }

  //   Check if the time slot is already reserved for the selected date, stadium, and sport
  if (
    reservations.some(
      (r) =>
        r.date === date &&
        r.time === time &&
        r.stadium === stadium &&
        r.sport === sport
    )
  ) {
    return NextResponse.json(
      { error: "Time slot already reserved" },
      { status: 400 }
    );
  }

  // Add the new reservation
  reservations.push({
    date,
    time,
    stadium,
    sport,
    firstName,
    lastName,
    email,
    telephone,
  });

  //   return NextResponse.json({ msg: "Hello from server" });
  return NextResponse.json(
    { message: "Reservation confirmed" }, // Always return a message
    { status: 201 }
  );
}
