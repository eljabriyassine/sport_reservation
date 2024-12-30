"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { MapPin, Clock, Users, CheckCircle, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Add new state for reservation search modal
const fadeInOut = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function ReservationSystem() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [reservationId, setReservationId] = useState<number | null>(null);

  // States for reservation search modal
  const [searchId, setSearchId] = useState<string>("");
  const [foundReservation, setFoundReservation] = useState<Reservation | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("api/get_reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  const handleSearchReservation = () => {
    const reservation = reservations.find(
      (reservation) => reservation.id === parseInt(searchId)
    );
    if (reservation) {
      setFoundReservation(reservation);
      setShowModal(true);
    } else {
      alert("Reservation not found!");
    }
  };

  const handleDeleteReservation = () => {
    if (foundReservation) {
      fetch(`api/delete_reservation/${foundReservation.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setReservations((prev) =>
              prev.filter(
                (reservation) => reservation.id !== foundReservation.id
              )
            );
            setShowModal(false);
            alert("Reservation deleted successfully!");
          } else {
            alert("Failed to delete reservation.");
          }
        })
        .catch((error) => console.error("Error deleting reservation:", error));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      {/* Main Reservation System */}
      <motion.div
        className="flex-grow mr-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>

        {/* Reservation Search Modal */}
        <div>
          <Input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Reservation ID"
            className="mb-4"
          />
          <Button onClick={handleSearchReservation}>Search Reservation</Button>
        </div>

        {showModal && foundReservation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-xl font-semibold mb-4">
                Reservation Details
              </h2>
              <div>
                <p>
                  <strong>Name:</strong> {foundReservation.firstName}{" "}
                  {foundReservation.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {foundReservation.email}
                </p>
                <p>
                  <strong>Telephone:</strong> {foundReservation.telephone}
                </p>
                <p>
                  <strong>Stadium:</strong> {foundReservation.stadium}
                </p>
                <p>
                  <strong>Sport:</strong> {foundReservation.sport}
                </p>
                <p>
                  <strong>Date:</strong> {foundReservation.date}
                </p>
                <p>
                  <strong>Time:</strong> {foundReservation.time}
                </p>
              </div>
              <Button
                onClick={handleDeleteReservation}
                className="mt-4 bg-red-500 hover:bg-red-600"
              >
                Delete Reservation
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="mt-4 ml-2 bg-gray-500 hover:bg-gray-600"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
