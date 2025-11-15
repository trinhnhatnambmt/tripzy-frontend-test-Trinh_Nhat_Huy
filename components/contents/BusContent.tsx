"use client";

import BusSelectField from "@/components/forms/BusSelectField";
import DatePicker from "@/components/forms/DatePicker";
import PassengerSelector from "@/components/forms/PassengerSelector";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { BusSearchFormData, validateBusSearchForm } from "@/lib/busValidation";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const BusContent = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<BusSearchFormData>({
        defaultValues: {
            from: "",
            to: "",
            departureDate: null,
            returnDate: null,
            isRoundTrip: false,
            passengers: 1,
        },
    });

    const onSubmit = async (data: BusSearchFormData) => {
        try {
            // Build query parameters
            const params = new URLSearchParams();
            params.set("mode", "bus");
            params.set("from", data.from);
            params.set("to", data.to);

            if (data.departureDate) {
                params.set("dep", format(data.departureDate, "yyyy-MM-dd"));
            }

            if (data.isRoundTrip && data.returnDate) {
                params.set("ret", format(data.returnDate, "yyyy-MM-dd"));
            }

            params.set("pax", data.passengers.toString());

            // Navigate to search page with query parameters
            router.push(`/search?${params.toString()}`);

            toast.success("Search successful!", {
                description: "Your bus search has been submitted.",
            });
        } catch (error) {
            console.error(error);
            toast.error("Search failed!", {
                description: "Please try again later.",
            });
        }
    };

    const handleFormSubmit = (data: BusSearchFormData) => {
        if (validateBusSearchForm(data)) {
            onSubmit(data);
        }
    };

    const router = useRouter();

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-10 justify-center items-center mt-3"
        >
            <div className="flex gap-2 px-5 items-center justify-between">
                <BusSelectField
                    title="FROM"
                    name="from"
                    register={register("from", {
                        required: "From location is required",
                    })}
                    setValue={setValue}
                    error={errors.from?.message}
                />
                <div className="w-[20%] h-[45px] bg-white shadow-custom flex justify-center items-center rounded-full mt-6">
                    <Image
                        src="/assets/icons/twoArrow.svg"
                        alt="twoArrow"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                </div>
                <BusSelectField
                    title="TO"
                    name="to"
                    register={register("to", {
                        required: "To location is required",
                    })}
                    setValue={setValue}
                    error={errors.to?.message}
                />
                <Controller
                    name="departureDate"
                    control={control}
                    rules={{
                        required: "Departure date is required",
                        validate: (value) => {
                            if (!value) return "Departure date is required";
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            if (value < today) {
                                return "Departure date cannot be in the past";
                            }
                            return true;
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <DatePicker
                            title="DEPARTURE DATE"
                            name="departureDate"
                            setValue={setValue}
                            field={field}
                            error={fieldState.error?.message}
                            value={field.value || undefined}
                        />
                    )}
                />
                <Controller
                    name="returnDate"
                    control={control}
                    rules={{
                        validate: (value, formValues) => {
                            if (formValues.isRoundTrip) {
                                if (!value) {
                                    return "Must choose the return date for round trip!!";
                                }
                                if (
                                    formValues.departureDate &&
                                    value <= formValues.departureDate
                                ) {
                                    return "The return date of the round trip must be after the departure date.";
                                }
                            }
                            return true;
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <DatePicker
                            showRoundTrip={true}
                            name="returnDate"
                            setValue={setValue}
                            field={field}
                            error={fieldState.error?.message}
                            value={field.value || undefined}
                            onRoundTripChange={(checked) => {
                                setValue("isRoundTrip", checked);
                                // Clear return date when round trip is unchecked
                                if (!checked) {
                                    setValue("returnDate", null);
                                    field.onChange(null);
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    name="passengers"
                    control={control}
                    rules={{
                        required: "Passengers is required",
                        min: {
                            value: 1,
                            message: "At least 1 passenger is required",
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <PassengerSelector
                            name="passengers"
                            setValue={setValue}
                            error={fieldState.error?.message}
                            value={field.value}
                        />
                    )}
                />
            </div>
            <Button
                type="submit"
                className="w-[266px] h-[52px] text-white bg-[#19C0FF] rounded-full cursor-pointer hover:bg-[#19C0FF]/90 transition-all duration-300"
            >
                <Image
                    src="/assets/icons/search.svg"
                    alt="search"
                    width={20}
                    height={20}
                />
                SEARCH
            </Button>
        </form>
    );
};

export default BusContent;
