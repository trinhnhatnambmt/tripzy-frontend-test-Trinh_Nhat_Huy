import { toast } from "sonner";

export interface BusSearchFormData {
    from: string;
    to: string;
    departureDate: Date | null;
    returnDate: Date | null;
    isRoundTrip: boolean;
    passengers: number;
}

export const validateBusSearchForm = (data: BusSearchFormData): boolean => {
    const errors: Record<string, string> = {};

    // Validate From
    if (!data.from || !data.from.trim()) {
        errors.from = "From location is required";
    }

    // Validate To
    if (!data.to || !data.to.trim()) {
        errors.to = "To location is required";
    }

    // Validate Departure Date
    if (!data.departureDate) {
        errors.departureDate = "Departure date is required";
    } else if (data.departureDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        errors.departureDate = "Departure date cannot be in the past";
    }

    // Validate Return Date if round trip
    if (data.isRoundTrip) {
        if (!data.returnDate) {
            errors.returnDate = "Must choose the return date for round trip!!";
        } else if (
            data.departureDate &&
            data.returnDate <= data.departureDate
        ) {
            errors.returnDate =
                "The return date of the round trip must be after the departure date.";
        }
    }

    // Validate Passengers
    if (!data.passengers || data.passengers < 1) {
        errors.passengers = "At least 1 passenger is required";
    }

    if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        toast.error("Validation Error", {
            description: firstError,
        });
        return false;
    }

    return true;
};
