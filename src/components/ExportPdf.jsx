import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
import font from "../components/AmiriFont";
import { Button } from "antd";

const ExportPdf = ({ pdfRef, ApiData, isPdf }) => {
  const exportPDF = () => {
    const pdf = new jsPDF("l", "mm", "a4");

    if (!isPdf) {
      html2canvas(pdfRef.current).then((canvas) => {
        let imgWidth = 295;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let pageHeight = 295;

        const imgData = canvas.toDataURL("img/png");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        let position = 2;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 1, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("download.pdf");
      });
    } else {
      pdf.addFileToVFS(
        "NotoSansArabic-VariableFont_wdth,wght-normal.ttf",
        font
      );
      pdf.addFont(
        "NotoSansArabic-VariableFont_wdth,wght-normal.ttf",
        "NotoSansArabic-VariableFont_wdth,wght",
        "normal"
      );
      pdf.setFont("NotoSansArabic-VariableFont_wdth,wght", "normal");
      autoTable(pdf, {
        bodyStyles: { font: "NotoSansArabic-VariableFont_wdth,wght" },
        head: [
          [
            "EmployeeId",
            "Name",
            "Serial",
            "ItemName",
            "Building",
            "Floor",
            "Office",
            "createdAt",
          ],
        ],
        body: ApiData,
        columns: [
          { header: "EmployeeId", dataKey: "EmployeeId" },
          { header: "Name", dataKey: "Name" },
          { header: "ItemName", dataKey: "ItemName" },
          { header: "Building", dataKey: "Building" },
          { header: "Floor", dataKey: "Floor" },
          { header: "Office", dataKey: "Office" },
          { header: "createdAt", dataKey: "createdAt" },
        ],
      });

      pdf.save("download.pdf");
    }
  };

  return (
    <Button
      style={{ borderRadius: "5px", width: "150px" }}
      type="primary"
      htmlType="submit"
      onClick={exportPDF}
      size={"large"}
    >
      ExportPdf
    </Button>
  );
};

export default ExportPdf;
