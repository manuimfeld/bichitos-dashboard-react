import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
import { DeleteAlertDialogContent } from "./deleteButton";
import { EditDialogContent } from "./editButton";
import { ColumnDef } from "@tanstack/react-table";

type Sale = {
  sale_id: number;
  amount: number;
  payment_method: "Efectivo" | "Transferencia" | "Débito" | "Crédito";
  turn: "Mañana" | "Tarde";
  sale_date: string;
};
export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "payment_method",
    header: "Pago",
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const roundedAmount = Math.floor(amount);
      return roundedAmount;
    },
  },
  {
    accessorKey: "turn",
    header: "Turno",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sale = row.original;

      return (
        <Dialog>
          <AlertDialog>
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
                  <AlertDialogTrigger>Eliminar</AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <EditDialogContent sale={sale} />
            <DeleteAlertDialogContent sale_id={sale.sale_id} />
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
