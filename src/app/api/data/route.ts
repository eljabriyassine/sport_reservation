import { NextResponse } from "next/server";

export async function GET() {
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];
  const stadiums = [
    { id: 1, name: "Terrain 1", sport: "Tennis" },
    { id: 2, name: "Terrain 2", sport: "Tennis" },
    { id: 3, name: "Terrain 3", sport: "Tennis" },
    { id: 4, name: "Olympic Arena", sport: "Football" },
    { id: 5, name: "City Sports Complex", sport: "Football" },
  ];

  return NextResponse.json({ timeSlots, stadiums });
}
