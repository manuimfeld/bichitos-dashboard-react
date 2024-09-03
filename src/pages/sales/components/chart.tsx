import { PieChart, Pie, Label, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const colorMapping = {
  Efectivo: "hsl(191, 100%, 41%)",
  Transferencia: "hsl(193, 69%, 53%)",
  Débito: "hsl(190, 100%, 35%)",
  Crédito: "hsl(195, 100%, 31%)",
};

const chartConfig = {
  quantity: {
    label: "Cantidad",
  },
  payment_method: {
    label: "Método de Pago",
  },
};

const transformSalesData = (sales) => {
  const groupedSales = sales.reduce((acc, sale) => {
    const method = sale.payment_method;

    if (!acc[method]) {
      acc[method] = { quantity: 0, totalAmount: 0 };
    }

    acc[method].quantity += 1;
    acc[method].totalAmount += Math.floor(parseFloat(sale.amount));

    return acc;
  }, {});

  return Object.keys(groupedSales).map((method) => ({
    payment_method_id: method,
    quantity: groupedSales[method].quantity,
    totalAmount: parseFloat(groupedSales[method].totalAmount), // Asegúrate de que totalAmount sea un número
    fill: colorMapping[method],
  }));
};

const formatDateInSpanish = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("es-ES", options);
};

const generatePDF = (sales) => {
  const pdf = new jsPDF();
  const chartData = transformSalesData(sales);

  // Configuración de texto
  pdf.setFont("Helvetica", "normal");
  pdf.setFontSize(12);

  // Agregar título
  pdf.setFontSize(20);
  pdf.text("Reporte de Ventas - Bichitos Petshop", 14, 25);

  // Agregar fecha
  const date = new Date();
  const formattedDate = formatDateInSpanish(date);
  pdf.setFontSize(16);
  pdf.text(formattedDate, 14, 35);

  // Resumen de ventas
  pdf.setFontSize(14);
  const totalSalesText = `Ventas en total: ${sales.length}`;
  pdf.text(totalSalesText, 14, 50);
  const totalAmount = sales.reduce(
    (sum, sale) => sum + Math.floor(parseFloat(sale.amount)),
    0
  );
  const totalAmountText = `Monto total: ${totalAmount.toLocaleString()}`;
  pdf.text(totalAmountText, 14, 58);

  // Detalles agrupados
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 255);
  pdf.text("Resumen por Tipo de Pago", 14, 75);
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);

  // Usar autoTable para crear una tabla
  pdf.autoTable({
    startY: 80,
    head: [["Método de Pago", "Cantidad", "Monto Total"]],
    body: chartData.map((data) => [
      data.payment_method_id,
      data.quantity,
      data.totalAmount,
    ]),
    styles: {
      fillColor: [240, 240, 240], // Fondo de las celdas
      textColor: [0, 0, 0], // Color del texto
      lineWidth: 0.1, // Grosor de las líneas
      fontSize: 10,
    },
    headStyles: {
      fillColor: [0, 123, 255], // Color de fondo del encabezado
      textColor: [255, 255, 255], // Color del texto del encabezado
    },
    margin: { left: 14, right: 14 },
    pageBreak: "auto", // Manejo de páginas
  });

  // Detalles individuales de ventas
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 255);
  pdf.text("Detalles de Ventas", 14, pdf.autoTable.previous.finalY + 10);
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);

  pdf.autoTable({
    startY: pdf.autoTable.previous.finalY + 20,
    head: [["Monto", "Tipo de Pago", "Turno"]],
    body: sales.map((sale) => [
      parseFloat(sale.amount).toFixed(2), // Asegúrate de mostrar dos decimales
      sale.payment_method,
      sale.turn || "Desconocido",
    ]),
    styles: {
      fillColor: [240, 240, 240], // Fondo de las celdas
      textColor: [0, 0, 0], // Color del texto
      lineWidth: 0.1, // Grosor de las líneas
      fontSize: 10,
    },
    headStyles: {
      fillColor: [0, 123, 255], // Color de fondo del encabezado
      textColor: [255, 255, 255], // Color del texto del encabezado
    },
    margin: { left: 14, right: 14 },
    pageBreak: "auto", // Manejo de páginas
  });

  // Guardar PDF
  pdf.save("sales-report.pdf");
};

export function ChartPie({ data, totalAmount }) {
  const chartData = transformSalesData(data);
  const totalQuantity = chartData.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  return (
    <Card className="mt-4 lg:mt-0 shadow-lg border border-[#E0E0E0] mb-2 lg:mb-0 order-2 lg:order-3 flex flex-col w-full lg:w-1/4 h-fit">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ventas en total</CardTitle>
        <CardDescription>7 de Julio de 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart
            width={400}
            height={400}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <Tooltip cursor={false} />
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="payment_method_id"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalQuantity.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Ventas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          El monto total es de: {totalAmount}
        </div>
        <div className="leading-none text-muted-foreground">
          <Button onClick={() => generatePDF(data)}>Generar PDF</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
