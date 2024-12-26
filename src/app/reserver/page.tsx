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
import { SuccessPopup } from "@/components/ui/succes-popup";
import Link from "next/link";
//
const timeSlots = ["9:00 AM", "10:00 AM"];

const stadiums = [
  { id: 1, name: "Terrain 1", sport: "Tennis" },
  { id: 2, name: "Terrain 2", sport: "Tennis" },
  { id: 3, name: "Terrain 3", sport: "Tennis" },
  { id: 4, name: "Olympic Arena", sport: "Football" },
  { id: 5, name: "City Sports Complex", sport: "Football" },
];

const sports = ["Tennis", "Football"];

type Reservation = {
  date: Date;
  time: string;
  stadium: string;
  sport: string;
};

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

  useEffect(() => {
    fetch("api/get_reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  const isDateAvailable = (date: Date) => {
    return date < new Date() || isDayFullyReserved(date);
  };

  const isDayFullyReserved = (date: Date) => {
    const reservedSlotsForDay = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date);
      return (
        reservationDate.toDateString() === date.toDateString() &&
        reservation.stadium === selectedStadium &&
        reservation.sport === selectedSport
      );
    });
    return reservedSlotsForDay.length === timeSlots.length;
  };

  const filteredStadiums = selectedSport
    ? stadiums.filter((stadium) => stadium.sport === selectedSport)
    : [];

  const handleSportChange = (sport: string | null) => {
    setSelectedSport(sport);
    setSelectedStadium(null); // Reset the stadium selection
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedSport && selectedStadium) {
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (selectedDate && selectedTime) {
        setStep(step + 1);
      }
    } else if (step === 3) {
      if (firstName && lastName && email && telephone) {
        handleReserve();
      }
    }
  };

  const isNextDisabled = () => {
    if (step === 1) {
      return !selectedSport || !selectedStadium;
    }
    if (step === 2) {
      return !selectedDate || !selectedTime;
    }
    if (step === 3) {
      return !firstName || !lastName || !email || !telephone;
    }
    return false;
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const isTimeSlotReserved = (time: string) => {
    return reservations.some((reservation) => {
      const reservationDate = new Date(reservation.date);
      return (
        reservationDate.toDateString() === selectedDate?.toDateString() &&
        reservation.time === time &&
        reservation.stadium === selectedStadium &&
        reservation.sport === selectedSport
      );
    });
  };

  const handleReserve = () => {
    if (selectedDate && selectedTime && selectedStadium && selectedSport) {
      const newReservation = {
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
        stadium: selectedStadium,
        sport: selectedSport,
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone,
      };

      fetch("api/add_reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || "Failed to reserve");
            });
          }
          return response.json();
        })
        .then(() => {
          setReservations((prevReservations) => [
            ...prevReservations,
            newReservation as Reservation,
          ]);

          setSelectedDate(null);
          setSelectedTime(null);
          setSelectedStadium(null);
          setSelectedSport(null);
          setFirstName("");
          setLastName("");
          setEmail("");
          setTelephone("");
          setStep((prev) => prev + 1);
        })
        .catch((error) => alert(`Reservation failed: ${error.message}`));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
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
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...fadeInOut}>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">
                    Select Stadium and Sport
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    onValueChange={handleSportChange}
                    value={selectedSport ?? undefined}
                  >
                    <SelectTrigger className="bg-white border rounded">
                      <SelectValue placeholder="Select Sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={setSelectedStadium}
                    value={selectedStadium ?? undefined}
                    disabled={!selectedSport} // Disable if no sport is selected
                  >
                    <SelectTrigger
                      className={`bg-white border rounded mt-4 ${
                        !selectedSport ? "opacity-50" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          selectedSport
                            ? "Select Stadium"
                            : "Select Sport First"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredStadiums.map((stadium) => (
                        <SelectItem key={stadium.id} value={stadium.name}>
                          {stadium.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...fadeInOut}>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-600">
                    Select Date and Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex">
                  <Calendar
                    mode="single"
                    selected={selectedDate ?? undefined}
                    onSelect={(day) => {
                      setSelectedDate(day ?? null);
                      setSelectedTime(null); // Reset time selection
                    }} // Map undefined to null
                    disabled={(date) => isDateAvailable(date)}
                    className="rounded-md border bg-white"
                  />
                  {selectedDate && (
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          disabled={isTimeSlotReserved(time)}
                          onClick={() => setSelectedTime(time)}
                          className={
                            selectedTime === time
                              ? "bg-green-500 hover:bg-green-600"
                              : ""
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...fadeInOut}>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-600">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Telephone</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-8 flex justify-end gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {step > 1 && step <= 3 && (
            <Button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-3 text-lg bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled()}
              className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:cursor-not-allowed"
            >
              Next
            </Button>
          ) : step === 3 ? (
            <Button
              onClick={handleReserve}
              className="bg-green-500 hover:bg-green-600"
            >
              Confirm Reservation
            </Button>
          ) : null}

          {step === 4 && (
            <Card className="w-96 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-600 flex items-center justify-between">
                  Reservation Successful
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your reservation has been confirmed. Thank you for choosing
                  our service!
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setStep(1)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  Close
                </Button>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-80 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-indigo-600">
              Reservation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-indigo-500" />
                <span>{selectedSport || "Select a sport"}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                <span>{selectedStadium || "Select a stadium"}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                <span>
                  {selectedDate
                    ? format(selectedDate, "MMMM d, yyyy")
                    : "Select a date"}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                <span>{selectedTime || "Select a time"}</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="space-y-2">
                {["Stadium & Sport", "Date & Time", "Personal Info"].map(
                  (stepName, index) => (
                    <motion.div
                      key={stepName}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle
                        className={`w-4 h-4 mr-2 ${
                          step > index ? "text-green-500" : "text-gray-300"
                        }`}
                      />
                      <span
                        className={
                          step > index
                            ? "font-medium text-indigo-600"
                            : "text-gray-500"
                        }
                      >
                        {stepName}
                      </span>
                    </motion.div>
                  )
                )}
                <Progress value={((step - 1) / 3) * 100} className="h-2 mb-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
