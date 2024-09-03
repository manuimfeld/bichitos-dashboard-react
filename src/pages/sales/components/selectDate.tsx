import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SelectDate({ params }) {
  const [date, setDate] = useState(new Date());

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      date: date,
    },
  });

  const onSubmit = () => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

    if (formattedDate === formattedCurrentDate) {
      alert("Navegando")
    } else {
        alert("Navegando")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="flex flex-wrap items-center">
        <p className="w-full mb-2 text-lg md:text-xs">Buscar por fecha</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setValue("date", date); // Update react-hook-form with the selected date
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        <button
          type="submit"
          className="inline uppercase text-white bg-[#00ADD2] md:text-xs text-md h-10 md:h-fit rounded-md md:w-fit w-fit md:py-3 px-4 md:px-4 mt-2 md:mt-0 md:ml-2"
        >
          Buscar {params}
        </button>
      </div>
    </form>
  );
}
