import Image from "next/image";
import { useState } from "react";

type TabProps = {
    color: string;
    value: string;
    image: string;
    title: string;
    tab: string;
    onClick: () => void;
};

const Tab = ({ color, value, image, title, tab, onClick }: TabProps) => {
    const [hover, setHover] = useState(false);

    const bgColor = tab === value ? color : hover ? color : "transparent";

    return (
        <div
            className="main-tabs transition-colors"
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Image
                src={`/assets/icons/${image}`}
                width={45}
                height={45}
                alt={title}
            />
            <h3 className="hidden lg:block lg:text-[18px] font-[400] text-center mt-1">
                {title}
            </h3>
        </div>
    );
};

export default Tab;
