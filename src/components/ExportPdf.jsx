import React from "react";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import html2canvas from "html2canvas";
import { Button } from "antd";

const ExportPdf = ({ pdfRef }) => {
  const exportPDF = () => {
    // const string = doc.html(renderToString(children), {
    //   callback: function (doc) {
    //     doc.save("sample.pdf");
    //   },
    // });

    html2canvas(pdfRef.current).then((canvas) => {
      let imgWidth = 208;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
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
