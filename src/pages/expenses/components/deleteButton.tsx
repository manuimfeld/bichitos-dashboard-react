import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteSale } from "@/services/sales/sales";

export const DeleteAlertDialogContent = ({ sale_id }) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteSale(sale_id);
      toast({
        variant: "success",
        title: "Venta eliminada",
        description: `La venta con ID: ${sale_id} fue eliminada correctamente.`,
      });
    } catch (error) {
      toast({
        variant: "success",
        title: "Error",
        description: "Hubo un problema al eliminar la venta." + error,
      });
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          ¿Estás seguro que quieres eliminar esta venta?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Si haces click en eliminar se eliminará para siempre
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
