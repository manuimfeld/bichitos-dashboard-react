import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

export const columns = [
  {
    accessorKey: "expenses_date",
    header: "Fecha",
    cell: ({ row }) => {
      const data = row.original;
      const date = data.expenses_date.split("T")[0];
      return <p>{date}</p>;
    },
  },
  {
    accessorKey: "provider",
    header: "Proveedor",
  },
  {
    accessorKey: "expenses_type",
    header: "Detalles",
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const data = row.original;
      const amount = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(data.amount);
      return <p>{amount}</p>;
    },
  },
  {
    accessorKey: "is_paid",
    header: "Estado",
    cell: ({ row }) => {
      const data = row.original;

      if (data.is_paid) {
        return (
          <p className="text-green-500 bg-green-200 p-1 rounded-full text-center">
            Pago
          </p>
        );
      }
      {
        return (
          <p className="text-yellow-500 border-yellow-500 border-2 p-1 rounded-full text-center">
            Pendiente
          </p>
        );
      }
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opciones</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger>Editar</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Eliminar gasto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar gasto</DialogTitle>
              <DialogDescription>
                Cambie los valores del gasto
              </DialogDescription>
              <div className="grid gap-4 py-4 text-black">
                <form className="h-fit flex-col">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Efectivo</SelectItem>
                        <SelectItem value="2">Transferencia</SelectItem>
                        <SelectItem value="3">Débito</SelectItem>
                        <SelectItem value="4">Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="payment_type">
                      Monto
                      <Input
                        id="amount"
                        type="number"
                        defaultValue={Math.floor(payment.amount)}
                      />
                    </Label>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Turno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Mañana</SelectItem>
                        <SelectItem value="2">Tarde</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <input type="submit" value="Guardar" />
                </form>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
