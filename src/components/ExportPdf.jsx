import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "antd";

const ExportPdf = ({ pdfRef }) => {
  const exportPDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      let imgWidth = 295;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let pageHeight = 295;

      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("l", "mm", "a4");
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
