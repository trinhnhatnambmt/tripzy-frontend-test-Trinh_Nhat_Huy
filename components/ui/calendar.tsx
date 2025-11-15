"use client";

import * as React from "react";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
    formatters,
    components,
    ...props
}: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                "bg-background group/calendar p-0 [--cell-size:24px] sm:[--cell-size:32px] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
                String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
                className
            )}
            captionLayout={captionLayout}
            formatters={{
                formatMonthDropdown: (date) =>
                    date.toLocaleString("default", { month: "short" }),
                ...formatters,
            }}
            classNames={{
                root: cn("w-fit", defaultClassNames.root),
                months: cn(
                    "flex gap-2 sm:gap-6 flex-col sm:flex-row relative",
                    defaultClassNames.months
                ),
                month: cn(
                    "flex flex-col w-full gap-2",
                    defaultClassNames.month
                ),
                nav: cn(
                    "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between pointer-events-none z-20",
                    defaultClassNames.nav
                ),
                button_previous: cn(
                    "absolute left-5 top-1 w-5 h-5 sm:w-6 sm:h-6 aria-disabled:opacity-50 p-0 select-none pointer-events-auto hover:opacity-70 z-30 cursor-pointer",
                    "[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 [&>svg]:text-[#1D2338]",
                    "transition-opacity duration-200",
                    defaultClassNames.button_previous
                ),
                button_next: cn(
                    "absolute right-5 top-1 w-5 h-5 sm:w-6 sm:h-6 aria-disabled:opacity-50 p-0 select-none pointer-events-auto hover:opacity-70 z-30 cursor-pointer",
                    "[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 [&>svg]:text-[#1D2338]",
                    "transition-opacity duration-200",
                    defaultClassNames.button_next
                ),
                month_caption: cn(
                    "flex items-center justify-center h-auto w-full relative mb-2",
                    defaultClassNames.month_caption
                ),
                dropdowns: cn(
                    "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
                    defaultClassNames.dropdowns
                ),
                dropdown_root: cn(
                    "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
                    defaultClassNames.dropdown_root
                ),
                dropdown: cn(
                    "absolute bg-popover inset-0 opacity-0",
                    defaultClassNames.dropdown
                ),
                caption_label: cn(
                    "select-none font-semibold text-[#1D2338] text-xs sm:text-sm flex-1 text-center relative z-0 flex items-center justify-center",
                    captionLayout === "label"
                        ? "min-h-[24px] sm:min-h-[28px]"
                        : "rounded-md pl-2 pr-1 flex items-center gap-1 h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
                    defaultClassNames.caption_label
                ),
                table: "w-full border-collapse",
                weekdays: cn("flex", defaultClassNames.weekdays),
                weekday: cn(
                    "text-[#7C8DA6] rounded-md flex-1 font-semibold text-[9px] sm:text-[10px] uppercase select-none text-center",
                    defaultClassNames.weekday
                ),
                week: cn("flex w-full mt-1 sm:mt-2", defaultClassNames.week),
                week_number_header: cn(
                    "select-none w-(--cell-size)",
                    defaultClassNames.week_number_header
                ),
                week_number: cn(
                    "text-[0.8rem] select-none text-muted-foreground",
                    defaultClassNames.week_number
                ),
                day: cn(
                    "relative w-full h-full p-0 text-center group/day aspect-square select-none",
                    "[&_button]:w-6 [&_button]:h-6 sm:[&_button]:w-8 sm:[&_button]:h-8 [&_button]:rounded-full [&_button]:text-xs sm:[&_button]:text-sm [&_button]:font-medium",
                    "[&_button]:hover:bg-[#F0F9FF] [&_button]:hover:text-[#19C0FF]",
                    defaultClassNames.day
                ),
                range_start: cn(
                    "rounded-l-md bg-accent",
                    defaultClassNames.range_start
                ),
                range_middle: cn(
                    "rounded-none",
                    defaultClassNames.range_middle
                ),
                range_end: cn(
                    "rounded-r-md bg-accent",
                    defaultClassNames.range_end
                ),
                today: cn(
                    "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
                    defaultClassNames.today
                ),
                outside: cn(
                    "text-muted-foreground aria-selected:text-muted-foreground",
                    defaultClassNames.outside
                ),
                disabled: cn(
                    "text-muted-foreground opacity-50",
                    defaultClassNames.disabled
                ),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Root: ({ className, rootRef, ...props }) => {
                    return (
                        <div
                            data-slot="calendar"
                            ref={rootRef}
                            className={cn(className)}
                            {...props}
                        />
                    );
                },
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === "left") {
                        return (
                            <ChevronLeftIcon
                                className={cn("size-4", className)}
                                {...props}
                            />
                        );
                    }

                    if (orientation === "right") {
                        return (
                            <ChevronRightIcon
                                className={cn("size-4", className)}
                                {...props}
                            />
                        );
                    }

                    return (
                        <ChevronDownIcon
                            className={cn("size-4", className)}
                            {...props}
                        />
                    );
                },
                DayButton: CalendarDayButton,
                WeekNumber: ({ children, ...props }) => {
                    return (
                        <td {...props}>
                            <div className="flex size-(--cell-size) items-center justify-center text-center">
                                {children}
                            </div>
                        </td>
                    );
                },
                ...components,
            }}
            {...props}
        />
    );
}

function CalendarDayButton({
    className,
    day,
    modifiers,
    ...props
}: React.ComponentProps<typeof DayButton>) {
    const defaultClassNames = getDefaultClassNames();

    const ref = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected &&
                !modifiers.range_start &&
                !modifiers.range_end &&
                !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                "data-[selected-single=true]:bg-[#19C0FF] data-[selected-single=true]:text-white data-[selected-single=true]:font-semibold",
                "data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground",
                "data-[range-start=true]:bg-[#19C0FF] data-[range-start=true]:text-white",
                "data-[range-end=true]:bg-[#19C0FF] data-[range-end=true]:text-white",
                "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50",
                "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal",
                "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
                "rounded-full",
                defaultClassNames.day,
                className
            )}
            {...props}
        />
    );
}

export { Calendar, CalendarDayButton };
