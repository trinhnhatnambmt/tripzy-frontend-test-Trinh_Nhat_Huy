"use client";

import { useState, useEffect, Suspense } from "react";
import { format, parse } from "date-fns";
import { BusSearchFormData } from "@/lib/busValidation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const SearchContent = () => {
    const [data, setData] = useState<BusSearchFormData | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const loadDataFromURL = () => {
            const from = searchParams.get("from");
            const to = searchParams.get("to");
            const dep = searchParams.get("dep");
            const ret = searchParams.get("ret");
            const pax = searchParams.get("pax");

            if (from && to && dep && pax) {
                try {
                    const parsedData: BusSearchFormData = {
                        from: decodeURIComponent(from),
                        to: decodeURIComponent(to),
                        departureDate: parse(dep, "yyyy-MM-dd", new Date()),
                        returnDate: ret
                            ? parse(ret, "yyyy-MM-dd", new Date())
                            : null,
                        isRoundTrip: !!ret,
                        passengers: parseInt(pax, 10),
                    };
                    setData(parsedData);
                } catch (error) {
                    console.error("Error parsing URL data:", error);
                    toast.error("Failed to load data", {
                        description: "Please try again later.",
                    });
                }
            }
        };
        loadDataFromURL();
    }, [searchParams]);

    if (!data) {
        return (
            <div className="w-full mx-auto mt-1 h-[80vh] bg-white shadow-custom rounded-2xl p-20 flex items-center justify-center">
                <p className="text-xl text-gray-500">No search data found</p>
            </div>
        );
    }

    const formatDate = (date: Date | null): string => {
        if (!date) return "No data";
        return format(new Date(date), "dd / MM / yyyy HH:mm");
    };

    return (
        <div className="w-full mx-auto mt-1 h-[80vh] bg-white shadow-custom rounded-2xl p-20 flex flex-col gap-10">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[#121216] text-2xl">From:</h2>
                <p className="font-semibold text-[#121216] text-2xl">
                    {data.from || "N/A"}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[#121216] text-2xl">To:</h2>
                <p className="font-semibold text-[#121216] text-2xl">
                    {data.to || "N/A"}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[#121216] text-2xl">
                    Departure date:
                </h2>
                <p className="font-semibold text-[#121216] text-2xl">
                    {formatDate(data.departureDate)}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[#121216] text-2xl">
                    Return date:
                </h2>
                <p className="font-semibold text-[#121216] text-2xl">
                    {formatDate(data.returnDate)}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h2 className="font-semibold text-[#121216] text-2xl">
                    No. of passenger:
                </h2>
                <p className="font-semibold text-[#121216] text-2xl">
                    {data.passengers || "N/A"}
                </p>
            </div>
        </div>
    );
};

const Search = () => {
    return (
        <Suspense
            fallback={
                <div className="w-full mx-auto mt-1 h-[80vh] bg-white shadow-custom rounded-2xl p-20 flex items-center justify-center">
                    <p className="text-xl text-gray-500">Loading...</p>
                </div>
            }
        >
            <SearchContent />
        </Suspense>
    );
};

export default Search;
