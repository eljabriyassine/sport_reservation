import { NextResponse } from "next/server";

interface Stadium {
  id: number;
  name: string;
  sport: string;
}

const timeSlots = ["9:00 AM", "10:00 AM"];
const stadiums: Stadium[] = [
  { id: 1, name: "Terrain 1", sport: "Tennis" },
  { id: 2, name: "Terrain 2", sport: "Tennis" },
  { id: 3, name: "Terrain 3", sport: "Tennis" },
  { id: 4, name: "Olympic Arena", sport: "Football" },
  { id: 5, name: "City Sports Complex", sport: "Football" },
  { id: 6, name: "Arena 1", sport: "Basketball" },
  { id: 7, name: "Arena 2", sport: "Basketball" },
];
export async function GET() {
  return NextResponse.json({ timeSlots, stadiums });
}
