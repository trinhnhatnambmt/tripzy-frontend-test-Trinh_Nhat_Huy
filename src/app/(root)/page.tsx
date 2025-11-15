"use client";

import BusContent from "@/components/contents/BusContent";
import Tab from "@/components/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const TabContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const tab = searchParams.get("tab") || "bus";

    const handleTabClick = (tabName: string) => {
        router.replace(`?tab=${tabName}`);
    };

    return (
        <>
            <div className="bg-[#fff] shadow-custom rounded-2xl h-[10vh] p-2  flex justify-between items-center gap-1">
                <Tab
                    color="#EBF9FF"
                    image="bus.svg"
                    title="Bus & Shuttle"
                    tab={tab}
                    onClick={() => handleTabClick("bus")}
                    value="bus"
                />

                <Tab
                    color="#F4FFEB"
                    image="hotel.svg"
                    title="Hotel & Accommodation"
                    tab={tab}
                    onClick={() => handleTabClick("hotel")}
                    value="hotel"
                />

                <Tab
                    color="#EBF4FF"
                    image="fight.svg"
                    title="Fight"
                    tab={tab}
                    onClick={() => handleTabClick("flight")}
                    value="flight"
                />
            </div>

            <div className="h-[30vh] flex items-center justify-center">
                {tab === "bus" && <BusContent />}
                {tab === "hotel" && (
                    <p className="text-[#767689] font-[400]">No data</p>
                )}
                {tab === "flight" && (
                    <p className="text-[#767689] font-[400]">No data</p>
                )}
            </div>
        </>
    );
};

const Home = () => {
    return (
        <div className="mt-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="main-title">Travel Smarter, Not Harder</h1>
                <p className="main-description">
                    Make every trip effortless. Tripzy lets you book rides and
                    plan journeys with ease
                </p>
            </div>
            <div className="w-full mx-auto mt-10 h-[40vh] bg-[#fff] shadow-custom rounded-2xl">
                <Suspense
                    fallback={
                        <div className="h-[40vh] flex items-center justify-center">
                            <p className="text-[#767689] font-[400]">
                                Loading...
                            </p>
                        </div>
                    }
                >
                    <TabContent />
                </Suspense>
            </div>
        </div>
    );
};

export default Home;
