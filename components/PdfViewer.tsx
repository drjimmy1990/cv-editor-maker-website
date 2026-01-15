import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader, ExternalLink, Maximize2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    pdfUrl: string;
    className?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, className = '' }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [loading, setLoading] = useState<boolean>(true);
    const [useFallback, setUseFallback] = useState<boolean>(false);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setLoading(false);
    };

    const onDocumentLoadError = (err: Error) => {
        console.error('PDF.js load error (falling back to iframe):', err);
        setUseFallback(true);
        setLoading(false);
    };

    const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
    const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

    const openInNewTab = () => {
        window.open(pdfUrl, '_blank');
    };

    // Fallback to iframe when CORS blocks PDF.js
    if (useFallback) {
        return (
            <div className={`flex flex-col h-full ${className}`}>
                {/* Control bar with Open in New Tab button */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-800 text-white shrink-0">
                    <span className="text-sm text-gray-300">PDF Preview</span>
                    <button
                        onClick={openInNewTab}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-teal-600 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                        <Maximize2 size={16} />
                        Open Full Screen (Best for iPad)
                    </button>
                </div>
                {/* Iframe fallback */}
                <div className="flex-1 relative">
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0`}
                        className="w-full h-full border-none"
                        title="CV Preview"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Controls */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-800 text-white shrink-0 gap-2 flex-wrap">
                {/* Pagination */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        className="p-1.5 rounded hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm min-w-[80px] text-center">
                        {loading ? '...' : `${pageNumber} / ${numPages}`}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        className="p-1.5 rounded hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Zoom */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={zoomOut}
                        disabled={scale <= 0.5}
                        className="p-1.5 rounded hover:bg-gray-700 disabled:opacity-40 transition-colors"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <span className="text-sm min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
                    <button
                        onClick={zoomIn}
                        disabled={scale >= 2.5}
                        className="p-1.5 rounded hover:bg-gray-700 disabled:opacity-40 transition-colors"
                    >
                        <ZoomIn size={18} />
                    </button>
                </div>

                {/* Open in new tab button */}
                <button
                    onClick={openInNewTab}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-teal-600 rounded text-sm font-medium transition-colors"
                    title="Open in new tab"
                >
                    <ExternalLink size={16} />
                    <span className="hidden sm:inline">Full Screen</span>
                </button>
            </div>

            {/* PDF Document */}
            <div
                className="flex-1 overflow-auto bg-gray-200 flex justify-center"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-x pan-y pinch-zoom'
                }}
            >
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                        <div className="text-center">
                            <Loader size={32} className="animate-spin text-primary mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">Loading PDF...</p>
                        </div>
                    </div>
                )}

                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={null}
                    className="py-4"
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-lg"
                    />
                </Document>
            </div>
        </div>
    );
};
