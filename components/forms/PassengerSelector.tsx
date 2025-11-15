"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";

interface PassengerSelectorProps {
    title?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    onValueChange?: (value: number) => void;
    name?: string;
    setValue?: UseFormSetValue<any>;
    error?: string;
    value?: number;
}

const PassengerSelector = ({
    title = "NO. OF PASSENGER",
    defaultValue = 1,
    min = 1,
    max = 99,
    onValueChange,
    name,
    setValue,
    error,
    value: controlledValue,
}: PassengerSelectorProps) => {
    const [count, setCount] = useState(() => controlledValue ?? defaultValue);

    const handleIncrement = () => {
        if (count < max) {
            const newValue = count + 1;
            setCount(newValue);
            onValueChange?.(newValue);
            if (name) setValue?.(name, newValue);
        }
    };

    const handleDecrement = () => {
        if (count > min) {
            const newValue = count - 1;
            setCount(newValue);
            onValueChange?.(newValue);
            if (name) setValue?.(name, newValue);
        }
    };

    // Sync controlled value with local state
    if (controlledValue !== undefined && controlledValue !== count) {
        setCount(controlledValue);
    }

    return (
        <div className="w-[149px] max-w-md space-y-3 text-[#121216]">
            <p className="text-xs font-semibold text-[#7C8DA6]">{title}</p>

            <div
                className={`flex w-[149px] items-center rounded-lg border bg-white shadow-[0_8px_24px_rgba(12,43,111,0.08)] overflow-hidden ${
                    error ? "border-red-500" : "border-[#DCE4F3]"
                }`}
            >
                {/* Left Section - Icon and Number */}
                <div className="flex flex-1 items-center gap-3 px-4">
                    <span className="flex items-center justify-center">
                        <Image
                            src="/assets/icons/human.svg"
                            alt="passenger"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                    </span>
                    <span className="text-lg font-semibold text-[#1D2338]">
                        {count}
                    </span>
                </div>

                {/* Right Section - Spinner Controls */}
                <div className="flex flex-col border-l border-[#DCE4F3] bg-[#F7FBFF]">
                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={count >= max}
                        className="flex cursor-pointer items-center justify-center px-3 py-1 hover:bg-[#E7EDF8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronUp size={16} className="text-[#1D2338]" />
                    </button>
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={count <= min}
                        className="flex cursor-pointer items-center justify-center px-3  py-1  hover:bg-[#E7EDF8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-t border-[#DCE4F3]"
                    >
                        <ChevronDown size={16} className="text-[#1D2338]" />
                    </button>
                </div>
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default PassengerSelector;
