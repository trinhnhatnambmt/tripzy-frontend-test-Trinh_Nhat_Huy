"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

import { locations } from "@/src/apis/mock-data";

type Location = (typeof locations)[number];

interface BusSelectFieldProps {
    title: string;
    name: string;
    register?: UseFormRegisterReturn;
    setValue?: UseFormSetValue<any>;
    error?: string;
    value?: string;
}

const BusSelectField = ({
    title = "FROM",
    name,
    register,
    setValue,
    error,
    value: controlledValue,
}: BusSelectFieldProps) => {
    const [query, setQuery] = useState(controlledValue || "");
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredLocations = useMemo(() => {
        if (!query.trim()) {
            return locations;
        }

        return locations.filter((location) => {
            const value =
                `${location.short_code} ${location.english_name} ${location.code_state}`.toLowerCase();

            return value.includes(query.toLowerCase());
        });
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (location: Location) => {
        setQuery(location.english_name);
        setValue?.(name, location.english_name);
        setIsOpen(false);
    };

    // Sync controlled value with local state
    if (controlledValue !== undefined && query !== controlledValue) {
        setQuery(controlledValue);
    }

    return (
        <div className="w-full max-w-md space-y-3 text-[#121216]">
            <p className="text-xs font-semibold  text-[#7C8DA6]">{title}</p>

            <div ref={wrapperRef} className="relative">
                <div
                    className={`flex w-full items-center gap-1 rounded-lg border bg-white px-1 py-1 shadow-[0_8px_24px_rgba(12,43,111,0.08)] focus-within:border-[#19C0FF] focus-within:shadow-[0_10px_40px_rgba(12,43,111,0.12)] ${
                        error ? "border-red-500" : "border-[#DCE4F3]"
                    }`}
                >
                    <span className="flex size-11 items-center justify-center rounded-xl text-[#19C0FF]">
                        <Image
                            src="/assets/icons/blackBus.svg"
                            alt="bus"
                            width={20}
                            height={20}
                            className="size-5"
                        />
                    </span>

                    <input
                        type="text"
                        inputMode="search"
                        {...register}
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setIsOpen(true);
                            setValue?.(name, event.target.value);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Enter city, terminal,..."
                        className="w-full border-none bg-transparent text-md font-sm text-[#1D2338] placeholder:text-[#CCCFD5] focus-visible:outline-none"
                    />
                </div>

                {isOpen && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-3 rounded-lg border border-[#E7EDF8] bg-white shadow-[0px_25px_70px_rgba(63,82,98,0.15)] w-[323px]">
                        <div className="max-h-40 xl:max-h-60 overflow-y-auto">
                            {filteredLocations.length === 0 ? (
                                <p className="px-6 py-4 text-sm text-[#7C8DA6]">
                                    No matches found
                                </p>
                            ) : (
                                filteredLocations.map((location) => (
                                    <button
                                        key={location.short_code}
                                        type="button"
                                        onClick={() => handleSelect(location)}
                                        className="flex w-full flex-col gap-1 border-b border-[#EFF3FB] px-6 py-4 text-left transition hover:bg-[#F7FBFF] last:border-none"
                                    >
                                        <span className="text-sm font-semibold text-[#1D2338]">
                                            {location.short_code} -{" "}
                                            {location.english_name}
                                        </span>
                                        <span className="text-xs font-medium text-[#7C8DA6]">
                                            {location.code_state}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default BusSelectField;
