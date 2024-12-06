import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const exportToExcel = (data: any[], fileName: string) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");
  writeFile(wb, `${fileName}.xlsx`);
};

export const exportToPDF = (
  data: any[],
  columns: string[],
  fileName: string
) => {
  const doc = new jsPDF();

  doc.table(1, 1, data, columns, { autoSize: true });

  // doc.autoTable({
  //   head: [columns],
  //   body: data.map((item) => columns.map((col) => item[col])),
  // });

  doc.save(`${fileName}.pdf`);
};
