import * as XLSX from "xlsx";

export const exportarExcel = (
  datos,
  nombreArchivo = "reporte.xlsx"
) => {
  if (
    !datos ||
    datos.length === 0
  ) {
    alert(
      "No hay datos para exportar."
    );

    return;
  }

  const hoja =
    XLSX.utils.json_to_sheet(
      datos
    );

  const libro =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    libro,
    hoja,
    "Calificaciones"
  );

  XLSX.writeFile(
    libro,
    nombreArchivo
  );
};