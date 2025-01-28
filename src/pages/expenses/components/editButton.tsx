import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Monto es requerido" }) // Asegura que el monto no esté vacío
    .max(999999, { message: "Monto debe tener un máximo de 10 caracteres" }), // Asegura un máximo de caracteres

  payment_method: z.string().min(1, { message: "Método de pago es requerido" }), // Asegura que el campo no esté vacío
  turn: z.enum(["Mañana", "Tarde"], {
    message: "Turno debe ser 'mañana' o 'tarde'",
  }), // Asegura que solo puede ser 'mañana' o 'tarde'

  sale_date: z.date(),
});

export const EditDialogContent = ({ sale }) => {
  const { toast } = useToast();

  function getToken() {
    const token = localStorage.getItem("authorization");
    return token;
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: sale.amount,
      payment_method: sale.payment_method,
      turn: sale.turn,
      sale_date: sale.sale_date ? new Date(sale.sale_date) : new Date(),
    },
  });

  const onSubmit = (data) => {
    const updatedSaleData = {
      payment_method_id: data.payment_method,
      amount: data.amount,
      turn: data.turn,
      sale_date: data.sale_date,
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/sales/${sale.sale_id}`,
        updatedSaleData,
        {
          headers: {
            authorization: `${getToken()}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then(function (response) {
        console.log("Venta actualizada:", response.data);
        toast({
          variant: "success",
          title: "Venta actualizada",
          description: "La venta fue actualizada correctamente",
        });
      })
      .catch(function (error) {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <DialogContent className="max-h-[75vh] overflow-y-scroll">
      <DialogHeader>
        <DialogTitle>Editar venta</DialogTitle>
        <DialogDescription>Cambie los valores de la venta</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 text-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="sale_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de la venta</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2024-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Seleccione la fecha de la venta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pago</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Método de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Efectivo">Efectivo</SelectItem>
                        <SelectItem value="Transferencia">
                          Transferencia
                        </SelectItem>
                        <SelectItem value="Débito">Débito</SelectItem>
                        <SelectItem value="Crédito">Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Seleccione el método de pago.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={field.value}
                      placeholder="Ingrese el monto"
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese el monto de la venta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="turn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turno</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Turno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mañana">Mañana</SelectItem>
                        <SelectItem value="Tarde">Tarde</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Seleccione el turno de la venta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-3 block uppercase text-white bg-[#00ADD2] md:text-xs text-lg h-12 md:h-fit rounded-md md:w-1/2 w-full py-[5px]"
            >
              Guardar
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
