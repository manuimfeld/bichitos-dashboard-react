import { CalendarIcon, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

/* const formSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Monto es requerido" }) // Asegura que el monto no esté vacío
    .max(999999, { message: "Monto debe tener un máximo de 10 caracteres" }), // Asegura un máximo de caracteres

  payment_method: z.string().min(1, { message: "Método de pago es requerido" }), // Asegura que el campo no esté vacío
  turn: z.enum(["Mañana", "Tarde"], {
    message: "Turno debe ser 'mañana' o 'tarde'",
  }), // Asegura que solo puede ser 'mañana' o 'tarde'

  sale_date: z.date(),
}); */

export function CreateSaleDialog() {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      amount: "",
      payment_method: "",
      turn: "",
      date: date,
    },
  });

  function getToken() {
    const token = localStorage.getItem("authorization");
    return token;
  }

  const paymentMethodMapping = {
    Efectivo: 1,
    Transferencia: 2,
    Débito: 3,
    Crédito: 4,
  };

  const turnMapping = {
    Mañana: "1",
    Tarde: "2",
  };

  const onSubmit = (data) => {
    const saleData = {
      payment_method_id: paymentMethodMapping[data.payment_method],
      amount: data.amount,
      customer_dni: null, // Ajusta esto según tus necesidades
      sale_date: data.date,
      created_by: 1, // Ajusta esto según tus necesidades
      turn: turnMapping[data.turn], // 'Mañana' o 'Tarde'
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/sales`, saleData, {
        headers: {
          authorization: `${getToken()}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log("Venta guardada:", response.data);
        resetField("amount"); // Solo resetear el campo de monto

        toast({
          variant: "default",
          title: "Venta guardada",
          description: "La venta fue guardada correctamente",
        });
      })
      .catch(function (error) {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear venta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-3/4">
        <DialogHeader>
          <DialogTitle>Editar venta</DialogTitle>
          <DialogDescription>Cambie los valores de la venta</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-sm"
        >
          <div className="flex flex-col">
            <p className="mb-2 text-lg md:text-xs">Fecha</p>
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
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
            {["Efectivo", "Transferencia", "Débito", "Crédito"].map(
              (method) => (
                <div key={method} className="w-fit">
                  <input
                    type="radio"
                    id={method}
                    {...register("payment_method", {
                      required: "Método de pago es requerido",
                    })}
                    value={method}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={method}
                    className="flex items-center justify-center w-32 h-12 md:w-24 md:h-8 text-lg md:text-xs border-2 border-[#2d2f40] rounded-md cursor-pointer text-center peer-checked:border-cyan-500 transition-all duration-300"
                  >
                    {method}
                  </label>
                </div>
              )
            )}
            {errors.payment_method && (
              <p className="text-red-500">{errors.payment_method.message}</p>
            )}
          </div>

          <p className="mt-3 mb-1 text-lg md:text-xs">Monto</p>
          <input
            type="number"
            id="amount"
            {...register("amount", {
              required: "Monto es requerido",
              valueAsNumber: true,
            })}
            className="border-[#2d2f40] border-[1.5px] rounded-md text-lg md:text-sm outline-0 bg-transparent px-2 py-2 w-full md:w-1/4 h-12 md:h-8"
            placeholder="$"
          />
          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}

          <p className="mb-1 mt-3 text-lg md:text-xs">Turno</p>
          <div className="flex flex-wrap justify-between md:justify-normal mb-2 gap-2">
            {["Mañana", "Tarde"].map((turn) => (
              <div key={turn} className="w-fit">
                <input
                  type="radio"
                  id={turn}
                  {...register("turn", { required: "Turno es requerido" })}
                  value={turn}
                  className="hidden peer"
                />
                <label
                  htmlFor={turn}
                  className="flex items-center justify-center w-32 h-12 md:w-24 md:h-8 text-lg md:text-xs border-2 border-[#2d2f40] rounded-md cursor-pointer text-center peer-checked:border-cyan-500 transition-all duration-300"
                >
                  {turn}
                </label>
              </div>
            ))}
            {errors.turn && (
              <p className="text-red-500">{errors.turn.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-3 block uppercase text-white bg-[#00ADD2] md:text-xs text-lg h-12 md:h-fit rounded-md md:w-1/2 w-full py-[5px]"
          >
            Guardar Venta
          </button>
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
