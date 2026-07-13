function PDFModal({ pdfUrl, onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <div className="w-[95vw] h-[95vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* TOP BAR */}

        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="font-bold text-xl">PDF Preview 📄</h2>

          <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded-xl">
            ✕
          </button>
        </div>

        {/* PDF */}

        <div className="w-full h-[calc(95vh-70px)] flex items-center justify-center text-4xl">
          PDF WORKING
        </div>
      </div>
    </div>
  );
}

export default PDFModal;
