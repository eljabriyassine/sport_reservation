import { NextResponse } from "next/server";

// Initial reservations data structure

import { reservations, timeSlots, isDayFullyReserved } from "../data";

// GET handler to retrieve all reservations
export async function GET(request) {
  console.log("hello");
  console.log(request.body);
  return NextResponse.json(reservations);
}
