import React from "react";

import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import { Button } from "antd";

const ExportPdf = ({ children }) => {
  const exportPDF = () => {
    const doc = new jsPDF("p", "pt", "letter");
    doc.html(ReactDOMServer.renderToString(children), {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
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
