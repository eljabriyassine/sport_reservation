import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
      >
        <Card className="w-96 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-600 flex items-center justify-between">
              Reservation Successful
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your reservation has been confirmed. Thank you for choosing our
              service!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={onClose}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
