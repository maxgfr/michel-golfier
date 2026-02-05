import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import { useState } from "react";

// Configure PDF.js worker - use the local worker file
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/static/scripts/pdf.worker.min.js";
}

type Props = {
  path: string;
  pageNumber: number;
  width: number | undefined;
  height: number | undefined;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
};

const PDFViewer = (props: Props) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    props.onLoadSuccess({ numPages });
  };

  return (
    <Document
      file={props.path}
      onLoadSuccess={handleLoadSuccess}
      loading={<div style={{ padding: "20px", textAlign: "center" }}>Chargement du document...</div>}
      error={<div style={{ padding: "20px", color: "red" }}>Erreur lors du chargement du document</div>}
    >
      <PdfPage
        pageNumber={props.pageNumber}
        width={props.width}
        height={props.height}
        loading={<div>Chargement de la page...</div>}
      />
    </Document>
  );
};

export default PDFViewer;
