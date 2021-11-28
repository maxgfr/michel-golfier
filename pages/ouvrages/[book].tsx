import type { NextPage } from "next";
import { useState } from "react";
import { Document, Page as Pdf, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Neschers = {
  path: "/assets/L-Histoire-de-Neschers.pdf",
};

const JbCroizet = {
  path: "/assets/Jean-Baptiste-Croizet.pdf",
};

const Page: NextPage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(3);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  return (
    <>
      <Document file={JbCroizet.path} onLoadSuccess={onDocumentLoadSuccess}>
        <Pdf pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </>
  );
};

export default Page;
