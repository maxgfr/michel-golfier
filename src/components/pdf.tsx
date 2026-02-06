import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/static/scripts/pdf.worker.min.mjs";

const PDF_OPTIONS = {
  wasmUrl: "/static/scripts/",
};

type Props = {
  path: string;
  pageNumber: number;
  numPages: number;
  onLoadSuccess: (data: { numPages: number }) => void;
  onPageChange: (page: number) => void;
};

function computeWidth() {
  if (typeof window === "undefined") return 650;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Mobile: nearly full width
  if (vw < 640) return vw - 32;
  // Tablet: comfortable width
  if (vw < 1024) return Math.min(vw - 64, 650);
  // Desktop: balance between readability and side-by-side layout
  // Use viewport height to ensure PDF fits on screen
  const widthBasedOnViewport = Math.min(vw * 0.5, 750);
  const widthBasedOnHeight = (vh - 300) * 0.7; // Accounting for header, controls, etc.
  return Math.min(widthBasedOnViewport, widthBasedOnHeight, 750);
}

function computeFullscreenWidth() {
  if (typeof window === "undefined") return 900;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Use most of the viewport but keep some padding
  const widthFromVw = vw - 120;
  const widthFromVh = (vh - 100) * 0.75;
  return Math.min(widthFromVw, widthFromVh, 1200);
}

const BookReader = ({ path, pageNumber, numPages, onLoadSuccess, onPageChange }: Props) => {
  const [width, setWidth] = useState(computeWidth);
  const [fullscreenWidth, setFullscreenWidth] = useState(computeFullscreenWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // Wrap onPageChange to add transition effect
  const changePage = useCallback((page: number) => {
    setIsTransitioning(true);
    onPageChange(page);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setIsTransitioning(false), 200);
  }, [onPageChange]);

  // Responsive resize
  const handleResize = useCallback(() => {
    setWidth(computeWidth());
    setFullscreenWidth(computeFullscreenWidth());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't capture when user is typing in an input
      if (e.target instanceof HTMLInputElement) return;

      if (e.key === "Escape" && isFullscreen) {
        e.preventDefault();
        setIsFullscreen(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (pageNumber < numPages) changePage(pageNumber + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (pageNumber > 1) changePage(pageNumber - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        changePage(1);
      } else if (e.key === "End") {
        e.preventDefault();
        changePage(numPages);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [pageNumber, numPages, changePage, isFullscreen]);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  // Progress percentage
  const progress = useMemo(() => {
    if (numPages <= 1) return 100;
    return Math.round(((pageNumber - 1) / (numPages - 1)) * 100);
  }, [pageNumber, numPages]);

  const goBack = () => {
    if (pageNumber > 1) changePage(pageNumber - 1);
  };

  const goNext = () => {
    if (pageNumber < numPages) changePage(pageNumber + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Progress bar */}
      <div style={{
        width: "100%",
        maxWidth: width,
        height: 3,
        backgroundColor: "#e8dfd2",
        borderRadius: 2,
        marginBottom: 16,
        overflow: "hidden",
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#8b6f47",
          borderRadius: 2,
          transition: "width 0.3s ease",
        }} />
      </div>

      {/* PDF Page — clickable zones */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          cursor: "default",
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Click-to-navigate zones (left = prev, right = next) */}
        <button
          type="button"
          onClick={goBack}
          onKeyDown={(e) => { if (e.key === 'Enter') goBack(); }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "35%",
            height: "100%",
            zIndex: 2,
            cursor: pageNumber > 1 ? "w-resize" : "default",
            background: "none",
            border: "none",
            padding: 0,
          }}
          aria-label="Page précédente"
          tabIndex={-1}
        />
        <button
          type="button"
          onClick={goNext}
          onKeyDown={(e) => { if (e.key === 'Enter') goNext(); }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "35%",
            height: "100%",
            zIndex: 2,
            cursor: pageNumber < numPages ? "e-resize" : "default",
            background: "none",
            border: "none",
            padding: 0,
          }}
          aria-label="Page suivante"
          tabIndex={-1}
        />

        {/* The PDF Document */}
        <div style={{
          opacity: isTransitioning ? 0.6 : 1,
          transition: "opacity 0.15s ease",
        }}>
          <Document
            file={path}
            options={PDF_OPTIONS}
            onLoadSuccess={(data) => {
              setIsLoading(false);
              onLoadSuccess(data);
            }}
            loading={
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 500,
                width,
                gap: 12,
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  border: "3px solid #e8dfd2",
                  borderTopColor: "#8b6f47",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                <p style={{ color: "#8c7a62", fontStyle: "italic", fontSize: 14 }}>
                  Chargement du livre&hellip;
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            }
            error={
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 400,
                width,
                gap: 16,
                padding: 32,
                textAlign: "center",
              }}>
                <p style={{ color: "#5c4729", fontSize: 16 }}>
                  Impossible de charger le PDF.
                </p>
                <a
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#8b6f47",
                    textDecoration: "underline",
                    fontSize: 14,
                  }}
                >
                  Télécharger le fichier directement
                </a>
              </div>
            }
          >
            <PdfPage
              pageNumber={pageNumber}
              width={width}
              renderAnnotationLayer={true}
              renderTextLayer={true}
            />
          </Document>
        </div>
      </div>

      {/* Bottom controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 20,
        width: "100%",
        maxWidth: width,
        flexWrap: "wrap",
      }}>
        {/* First page */}
        <button
          type="button"
          onClick={() => changePage(1)}
          disabled={pageNumber <= 1}
          style={{
            background: "none",
            border: "1px solid #d4c5a9",
            borderRadius: 4,
            padding: "6px 10px",
            cursor: pageNumber <= 1 ? "default" : "pointer",
            opacity: pageNumber <= 1 ? 0.3 : 1,
            color: "#5c4729",
            fontSize: 13,
            transition: "all 0.2s",
          }}
          aria-label="Première page"
          title="Première page"
        >
          &#8676;
        </button>

        {/* Previous */}
        <button
          type="button"
          onClick={goBack}
          disabled={pageNumber <= 1}
          style={{
            background: "none",
            border: "1px solid #d4c5a9",
            borderRadius: 4,
            padding: "6px 14px",
            cursor: pageNumber <= 1 ? "default" : "pointer",
            opacity: pageNumber <= 1 ? 0.3 : 1,
            color: "#5c4729",
            fontSize: 13,
            transition: "all 0.2s",
          }}
          aria-label="Page précédente"
        >
          &#8592; Précédent
        </button>

        {/* Page indicator */}
        <span style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          color: "#8c7a62",
          fontVariantNumeric: "tabular-nums",
          userSelect: "none",
          padding: "0 4px",
        }}>
          <input
            type="number"
            value={isLoading ? 1 : pageNumber}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (v >= 1 && v <= numPages) changePage(v);
            }}
            min={1}
            max={numPages}
            style={{
              width: 52,
              textAlign: "center",
              border: "1px solid #d4c5a9",
              borderRadius: 4,
              padding: "4px 6px",
              fontSize: 14,
              color: "#3d2b1f",
              background: "#fefcf8",
              outline: "none",
              fontVariantNumeric: "tabular-nums",
            }}
            aria-label="Numéro de page"
          />
          <span>/&nbsp;{numPages}</span>
        </span>

        {/* Next */}
        <button
          type="button"
          onClick={goNext}
          disabled={pageNumber >= numPages}
          style={{
            background: "none",
            border: "1px solid #d4c5a9",
            borderRadius: 4,
            padding: "6px 14px",
            cursor: pageNumber >= numPages ? "default" : "pointer",
            opacity: pageNumber >= numPages ? 0.3 : 1,
            color: "#5c4729",
            fontSize: 13,
            transition: "all 0.2s",
          }}
          aria-label="Page suivante"
        >
          Suivant &#8594;
        </button>

        {/* Last page */}
        <button
          type="button"
          onClick={() => changePage(numPages)}
          disabled={pageNumber >= numPages}
          style={{
            background: "none",
            border: "1px solid #d4c5a9",
            borderRadius: 4,
            padding: "6px 10px",
            cursor: pageNumber >= numPages ? "default" : "pointer",
            opacity: pageNumber >= numPages ? 0.3 : 1,
            color: "#5c4729",
            fontSize: 13,
            transition: "all 0.2s",
          }}
          aria-label="Dernière page"
          title="Dernière page"
        >
          &#8677;
        </button>

        {/* Fullscreen / Zoom */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          style={{
            background: "none",
            border: "1px solid #d4c5a9",
            borderRadius: 4,
            padding: "6px 14px",
            cursor: "pointer",
            color: "#5c4729",
            fontSize: 13,
            transition: "all 0.2s",
            marginLeft: 4,
          }}
          aria-label="Agrandir la page"
          title="Agrandir la page"
        >
          &#x26F6; Zoom
        </button>
      </div>

      {/* Keyboard hint */}
      <p style={{
        marginTop: 10,
        fontSize: 11,
        color: "#b8a88a",
        textAlign: "center",
        letterSpacing: "0.02em",
      }}>
        Utilisez les flèches <kbd style={{ padding: "1px 5px", border: "1px solid #d4c5a9", borderRadius: 3, fontSize: 10 }}>&#8592;</kbd> <kbd style={{ padding: "1px 5px", border: "1px solid #d4c5a9", borderRadius: 3, fontSize: 10 }}>&#8594;</kbd> ou cliquez sur les côtés de la page
      </p>

      {/* Fullscreen overlay — rendered via portal to escape stacking context */}
      {isFullscreen && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => {
            // Close when clicking on the backdrop
            if (e.target === e.currentTarget) setIsFullscreen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsFullscreen(false);
          }}
          role="dialog"
          aria-label="Page en plein écran"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              cursor: "pointer",
              color: "white",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
              zIndex: 1,
            }}
            aria-label="Fermer"
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
          >
            &#10005;
          </button>

          {/* PDF page in large */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Click-to-navigate zones */}
            <button
              type="button"
              onClick={goBack}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "35%",
                height: "100%",
                zIndex: 2,
                cursor: pageNumber > 1 ? "w-resize" : "default",
                background: "none",
                border: "none",
                padding: 0,
              }}
              aria-label="Page précédente"
              tabIndex={-1}
            />
            <button
              type="button"
              onClick={goNext}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "35%",
                height: "100%",
                zIndex: 2,
                cursor: pageNumber < numPages ? "e-resize" : "default",
                background: "none",
                border: "none",
                padding: 0,
              }}
              aria-label="Page suivante"
              tabIndex={-1}
            />
            <Document file={path} options={PDF_OPTIONS} loading={<></>} error={<></>}>
              <PdfPage
                pageNumber={pageNumber}
                width={fullscreenWidth}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          </div>

          {/* Fullscreen controls */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 16,
          }}>
            <button
              type="button"
              onClick={goBack}
              disabled={pageNumber <= 1}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 4,
                padding: "6px 14px",
                cursor: pageNumber <= 1 ? "default" : "pointer",
                opacity: pageNumber <= 1 ? 0.3 : 1,
                color: "white",
                fontSize: 13,
                transition: "all 0.2s",
              }}
              aria-label="Page précédente"
            >
              &#8592; Précédent
            </button>
            <span style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              fontVariantNumeric: "tabular-nums",
              userSelect: "none",
            }}>
              {pageNumber}&nbsp;/&nbsp;{numPages}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={pageNumber >= numPages}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 4,
                padding: "6px 14px",
                cursor: pageNumber >= numPages ? "default" : "pointer",
                opacity: pageNumber >= numPages ? 0.3 : 1,
                color: "white",
                fontSize: 13,
                transition: "all 0.2s",
              }}
              aria-label="Page suivante"
            >
              Suivant &#8594;
            </button>
          </div>

          {/* Hint */}
          <p style={{
            marginTop: 8,
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
          }}>
            Appuyez sur <kbd style={{ padding: "1px 5px", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 3, fontSize: 10 }}>Esc</kbd> pour fermer
          </p>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default BookReader;
