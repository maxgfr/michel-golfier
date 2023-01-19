import { Document, Page as Pdf, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/scripts/pdf.worker.min.js";

type Props = {
  path: string;
  pageNumber: number;
  width: number;
  height: number;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
};

const PDFViewer = (props: Props) => {
  return (
    <Document file={props.path} onLoadSuccess={props.onLoadSuccess}>
      <Pdf
        pageNumber={props.pageNumber}
        width={props.width}
        height={props.height}
      />
    </Document>
  );
};

export default PDFViewer;
