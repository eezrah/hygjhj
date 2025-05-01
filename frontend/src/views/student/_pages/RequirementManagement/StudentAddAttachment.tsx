import { useState, DragEvent } from "react";
import {
  Paperclip,
  UploadCloud,
  X,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

// Define interface for location state
interface LocationState {
  documentIndex?: number;
}

// Define interface for document item
interface DocumentItem {
  name: string;
  file: string;
  uploaded: boolean;
}

export default function StudentAddAttachment() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const documentIndex = state?.documentIndex;

  // Get document name based on index
  const getDocumentName = (index: number | undefined): string => {
    if (index === undefined) return "Document";

    const documentNames = [
      "Application Form",
      "Cover Letter",
      "Birth Certificate",
      "Grades",
      "Certificate of Good Moral",
    ];
    return documentNames[index] || "Document";
  };

  const handleFileUpload = (uploadedFile: File): void => {
    setFile(uploadedFile);

    // Simulate progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files?.[0]) {
      handleFileUpload(event.target.files[0]);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) {
      handleFileUpload(event.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (): void => {
    setFile(null);
    setUploadProgress(0);
    setIsUploaded(false);
  };

  const handleSubmit = (): void => {
    if (file && documentIndex !== undefined) {
      // Get current documents if available
      let currentDocs: DocumentItem[] = [];
      const savedDocs = localStorage.getItem("applicationDocuments");
      if (savedDocs) {
        currentDocs = JSON.parse(savedDocs);
      } else {
        // Initialize with default structure if not found
        currentDocs = [
          { name: "Application Form", file: "", uploaded: false },
          { name: "Cover Letter", file: "", uploaded: false },
          { name: "Birth Certificate", file: "", uploaded: false },
          { name: "Grades", file: "", uploaded: false },
          { name: "Certificate of Good Moral", file: "", uploaded: false },
        ];
      }

      // Update the specific document
      currentDocs[documentIndex] = {
        ...currentDocs[documentIndex],
        file: file.name,
        uploaded: true,
      };

      // Save to localStorage before navigation
      localStorage.setItem("applicationDocuments", JSON.stringify(currentDocs));

      // Navigate back with the file information
      navigate("/student/studentsubmitapplication", {
        state: {
          filename: file.name,
          documentIndex,
        },
      });
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
      <div className="flex-1 p-8">
        {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-8 border border-[#024FA8]/10 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Paperclip className="w-6 h-6 text-[#024FA8]" />
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent">
              Add {getDocumentName(documentIndex)}
            </h2>
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`mt-4 border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              isDragging
                ? "border-[#024FA8] bg-gradient-to-r from-[#F0F7FF] to-[#E0F2FE]"
                : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Label Wrapper to Ensure Click */}
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-full h-full block"
            >
              <div className="flex flex-col items-center space-y-4">
                <UploadCloud className="w-12 h-12 text-[#64748B]" />
                <p className="text-[#334155] font-medium">
                  Drag and Drop File Here
                </p>
                <p className="text-sm text-[#64748B]">or</p>
                <button
                  type="button"
                  className="px-6 py-3 bg-gradient-to-r from-[#024FA8] to-[#0369A1] text-white rounded-lg hover:from-[#023d82] hover:to-[#025785] transition-all shadow-sm hover:shadow-md"
                >
                  Browse Files
                </button>
              </div>
            </label>

            <p className="text-sm text-[#64748B] mt-4">
              Note: Must submit all required documents in PDF format (maximum
              5MB per file)
            </p>
          </div>

          {/* Uploaded File Preview */}
          {file && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center bg-gradient-to-r from-[#F0F7FF] to-[#E0F2FE] p-4 rounded-lg border border-[#024FA8]/20">
                <div className="flex items-center space-x-3">
                  <Paperclip className="w-5 h-5 text-[#0369A1]" />
                  <span className="text-[#0369A1] font-medium">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-2 hover:bg-red-50/80 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-[#024FA8] to-[#0369A1] rounded-full transition-all duration-500"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#64748B]">
                {uploadProgress}% Uploaded
              </p>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isUploaded}
                className={`mt-3 w-full py-3 rounded-lg font-medium transition-all ${
                  isUploaded
                    ? "bg-gradient-to-r from-[#024FA8] to-[#0369A1] text-white hover:from-[#023d82] hover:to-[#025785] shadow-sm hover:shadow-md"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Upload {getDocumentName(documentIndex)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
