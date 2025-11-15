"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    return (
        <section className="flex items-center h-[100px] ">
            <Image
                src="/assets/icons/logo.svg"
                alt="logo"
                width={140}
                height={60}
                className="h-8 w-auto cursor-pointer"
                onClick={() => router.push("/")}
            />
        </section>
    );
};

export default Header;
