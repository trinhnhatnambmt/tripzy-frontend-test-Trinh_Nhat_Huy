"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useDatePickerContext } from "./DatePickerContext";
import { UseFormSetValue, ControllerRenderProps } from "react-hook-form";

interface DatePickerProps {
    title?: string;
    showRoundTrip?: boolean;
    onDateChange?: (date: Date | undefined) => void;
    defaultValue?: Date;
    name?: string;
    setValue?: UseFormSetValue<any>;
    field?: ControllerRenderProps<any, string>;
    error?: string;
    value?: Date;
    onRoundTripChange?: (isRoundTrip: boolean) => void;
}

const DatePicker = ({
    title = "DEPARTURE DATE",
    showRoundTrip = false,
    onDateChange,
    defaultValue,
    name,
    setValue,
    field,
    error,
    value: controlledValue,
    onRoundTripChange,
}: DatePickerProps) => {
    const pickerId = useId();
    const { openPickerId, setOpenPickerId } = useDatePickerContext();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [popupPosition, setPopupPosition] = useState<{
        top: number;
        left: number;
        width: number;
    } | null>(null);

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        controlledValue || defaultValue
    );
    const [selectedTime] = useState<string>(() => {
        if (defaultValue) {
            return format(defaultValue, "HH:mm");
        }
        return "00:00";
    });
    const isOpen = openPickerId === pickerId;
    const [isRoundTrip, setIsRoundTrip] = useState(false);

    const handleRoundTripChange = (checked: boolean) => {
        setIsRoundTrip(checked);
        onRoundTripChange?.(checked);
        setValue?.("isRoundTrip", checked);
    };

    // Handle click outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const calendarPopup = (target as Element).closest(
                "[data-calendar-popup]"
            );
            const wrapper = wrapperRef.current;

            if (wrapper && !wrapper.contains(target) && !calendarPopup) {
                setOpenPickerId(null);
            }
        };

        // Delay to avoid immediate closing
        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside, true);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [isOpen, setOpenPickerId]);

    // Sync controlled value with local state
    useEffect(() => {
        if (controlledValue !== undefined) {
            setSelectedDate(controlledValue);
        }
    }, [controlledValue]);

    const handleToggle = (e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (isDisabled) return;
        console.log("DatePicker toggle clicked", { isOpen, pickerId });
        if (isOpen) {
            setOpenPickerId(null);
            setPopupPosition(null);
        } else {
            // Calculate position for portal
            if (wrapperRef.current) {
                const rect = wrapperRef.current.getBoundingClientRect();
                setPopupPosition({
                    top: rect.bottom + window.scrollY + 8,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                });
            }
            setOpenPickerId(pickerId);
        }
    };

    const handleDateSelect = (date: Date | undefined) => {
        if (isDisabled) return;

        setSelectedDate(date);
        if (date && selectedTime) {
            const [hours, minutes] = selectedTime.split(":");
            const newDate = new Date(date);
            newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            onDateChange?.(newDate);
            if (name) setValue?.(name, newDate);
            field?.onChange(newDate);
        } else {
            onDateChange?.(date);
            if (name) setValue?.(name, date);
            field?.onChange(date);
        }
    };

    const formatDisplayDate = () => {
        if (!selectedDate) return "";
        return format(selectedDate, "dd / MM / yyyy") + ` ${selectedTime}`;
    };

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const isFirstOfMonth = (date: Date) => {
        return date.getDate() === 1;
    };

    const modifiers = {
        weekend: (date: Date) => isWeekend(date),
        firstOfMonth: (date: Date) => isFirstOfMonth(date),
    };

    // Disable return date picker only when round trip is NOT checked
    // When round trip IS checked, allow user to select return date
    const isDisabled = showRoundTrip && !isRoundTrip;

    return (
        <div className="w-full max-w-md space-y-3 text-[#121216]">
            {showRoundTrip ? (
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        id="round-trip"
                        checked={isRoundTrip}
                        onChange={(e) =>
                            handleRoundTripChange(e.target.checked)
                        }
                        className="w-4 h-4 rounded border-[#DCE4F3] text-[#19C0FF] focus:ring-[#19C0FF] focus:ring-2 cursor-pointer"
                    />
                    <label
                        htmlFor="round-trip"
                        className="text-xs font-semibold text-[#7C8DA6] cursor-pointer mb-1"
                    >
                        ROUND TRIP?
                    </label>
                </div>
            ) : (
                <p className="text-xs font-semibold text-[#7C8DA6]">{title}</p>
            )}

            <div className="relative" ref={wrapperRef}>
                <div
                    className={cn(
                        "flex w-full items-center gap-1 rounded-lg border bg-white px-1 py-1 shadow-[0_8px_24px_rgba(12,43,111,0.08)] transition-all",
                        isDisabled
                            ? "opacity-50 cursor-not-allowed bg-gray-100"
                            : "focus-within:border-[#19C0FF] focus-within:shadow-[0_10px_40px_rgba(12,43,111,0.12)] cursor-pointer",
                        isOpen &&
                            "border-[#19C0FF] shadow-[0_10px_40px_rgba(12,43,111,0.12)]",
                        error && !isDisabled && "border-red-500"
                    )}
                    onClick={(e) => handleToggle(e)}
                    onMouseDown={(e) => {
                        if (!isDisabled) {
                            e.preventDefault();
                        }
                    }}
                >
                    <span className="flex size-11 items-center justify-center rounded-xl text-[#19C0FF]">
                        <Image
                            src="/assets/icons/dateIcon.svg"
                            alt="date"
                            width={20}
                            height={20}
                            className="size-4"
                        />
                    </span>

                    <input
                        type="text"
                        readOnly
                        value={formatDisplayDate()}
                        placeholder="DD / MM / YYYY 00:00"
                        disabled={isDisabled}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isDisabled) {
                                handleToggle(e);
                            }
                        }}
                        className={cn(
                            "w-full border-none bg-transparent text-md font-sm text-[#1D2338] placeholder:text-[#CCCFD5] focus-visible:outline-none cursor-pointer",
                            isDisabled && "cursor-not-allowed"
                        )}
                    />
                </div>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>

            {isOpen &&
                !isDisabled &&
                typeof window !== "undefined" &&
                popupPosition &&
                createPortal(
                    <>
                        {/* Mobile Overlay */}
                        <div
                            className="fixed inset-0 bg-black/20 z-40 sm:hidden"
                            onClick={() => {
                                setOpenPickerId(null);
                                setPopupPosition(null);
                            }}
                        />
                        {/* Calendar Popup */}
                        <div
                            data-calendar-popup
                            style={{
                                display: "block",
                                position: "fixed",
                                zIndex: 9999,
                                top: `${popupPosition.top}px`,
                                left: `${popupPosition.left}px`,
                            }}
                            className="rounded-lg border border-[#E7EDF8] bg-white shadow-[0px_25px_70px_rgba(63,82,98,0.15)] w-[calc(100vw-1rem)] sm:w-[500px] lg:w-[555px] sm:p-3 max-h-[40vh] overflow-y-auto overflow-x-hidden"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                {/* Calendar */}
                                <div className="flex-1 min-w-0 w-full overflow-x-auto">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateSelect}
                                        numberOfMonths={
                                            typeof window !== "undefined" &&
                                            window.innerWidth < 640
                                                ? 1
                                                : 2
                                        }
                                        modifiers={modifiers}
                                        modifiersClassNames={{
                                            weekend: "!text-red-500",
                                            firstOfMonth: "!text-red-500",
                                        }}
                                        modifiersStyles={{
                                            weekend: { color: "#ef4444" },
                                            firstOfMonth: { color: "#ef4444" },
                                        }}
                                        className="p-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </>,
                    document.body
                )}
        </div>
    );
};

export default DatePicker;
