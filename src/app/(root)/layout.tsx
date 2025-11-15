import Header from "@/components/Header";
import { DatePickerProvider } from "@/components/forms/DatePickerContext";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <DatePickerProvider>
            <main className="main-layout">
                <div className="w-full h-1/2 bg-color-layout">
                    <div className="container mx-auto px-50 ">
                        <Header />
                        <div>{children}</div>
                    </div>
                </div>
            </main>
        </DatePickerProvider>
    );
};

export default Layout;
