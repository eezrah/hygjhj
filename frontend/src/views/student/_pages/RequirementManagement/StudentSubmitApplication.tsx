import { useState, useEffect } from "react";
import { PlusCircle, X, FileText, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface DocumentItem {
  name: string;
  file: string;
  uploaded: boolean;
}

interface LocationState {
  filename?: string;
  documentIndex?: number;
}

function StudentSubmitApplication() {
  const navigate = useNavigate();
  const location = useLocation();

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const savedDocuments = localStorage.getItem("applicationDocuments");
    if (savedDocuments) {
      return JSON.parse(savedDocuments);
    } else {
      return [
        { name: "Application Form", file: "", uploaded: false },
        { name: "Cover Letter", file: "", uploaded: false },
      ];
    }
  });

  useEffect(() => {
    const state = location.state as LocationState | null;

    if (state?.filename && state.documentIndex !== undefined) {
      const { filename, documentIndex } = state;

      const updatedDocuments = [...documents];
      updatedDocuments[documentIndex] = {
        ...updatedDocuments[documentIndex],
        file: filename,
        uploaded: true,
      };

      setDocuments(updatedDocuments);
      localStorage.setItem(
        "applicationDocuments",
        JSON.stringify(updatedDocuments)
      );

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname, documents]);

  const handleAddAttachmentClick = (index: number): void => {
    // Check if it's the "Application Form" and navigate to the view page
    if (documents[index].name === "Application Form") {
      navigate("/student/studentpersonaldata"); // Fixed: Using absolute path
    } else {
      navigate("/student/studentaddattachment", {
        // Fixed: Using absolute path
        state: { documentIndex: index },
      });
    }
  };

  const handleRemoveAttachmentClick = (index: number): void => {
    const updatedDocuments = [...documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      file: "",
      uploaded: false,
    };
    setDocuments(updatedDocuments);
    localStorage.setItem(
      "applicationDocuments",
      JSON.stringify(updatedDocuments)
    );
  };

  const handleSubmitRequirementsClick = (): void => {
    const uploadedDocuments = documents.filter((doc) => doc.uploaded);
    localStorage.setItem(
      "submittedDocuments",
      JSON.stringify(uploadedDocuments)
    );
    navigate("/student/studentapplicationstatus", {
      state: { submittedDocuments: uploadedDocuments },
    });
  };

  // Ensure old documents are cleared from localStorage when page is loaded
  useEffect(() => {
    const documentsStored = localStorage.getItem("applicationDocuments");
    if (documentsStored) {
      const documentsData = JSON.parse(documentsStored);
      // Only keep the new set of documents (Application Form and Cover Letter)
      const updatedDocuments = documentsData.filter(
        (doc: DocumentItem) =>
          doc.name === "Application Form" || doc.name === "Cover Letter"
      );
      setDocuments(updatedDocuments);
      localStorage.setItem(
        "applicationDocuments",
        JSON.stringify(updatedDocuments)
      );
    }
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
      <div className="flex-1 p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-8 border border-[#024FA8]/10">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-[#024FA8]" />
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent">
              Required Documents
            </h2>
          </div>

          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  doc.uploaded
                    ? "bg-gradient-to-r from-[#F0F7FF] to-[#E0F2FE] border border-[#024FA8]/20"
                    : "bg-white/50 border border-[#E2E8F0] hover:border-[#024FA8]/20"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {doc.uploaded ? (
                    <CheckCircle className="w-5 h-5 text-[#0369A1]" />
                  ) : (
                    <FileText className="w-5 h-5 text-[#64748B]" />
                  )}
                  <span
                    className={`font-medium ${
                      doc.uploaded ? "text-[#0369A1]" : "text-[#334155]"
                    }`}
                  >
                    {doc.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4 justify-end w-full">
                  {doc.uploaded ? (
                    <>
                      <span className="text-[#0369A1] text-sm">{doc.file}</span>
                      <button
                        className="p-2 hover:bg-red-50/80 rounded-full transition-colors"
                        onClick={() => handleRemoveAttachmentClick(index)}
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#024FA8] to-[#0369A1] text-white rounded-lg hover:from-[#023d82] hover:to-[#025785] transition-all shadow-sm hover:shadow-md"
                      onClick={() => handleAddAttachmentClick(index)}
                    >
                      {doc.name === "Application Form" ? (
                        <span>Edit Application Form</span> // Change text for "Application Form"
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4" />
                          <span>Add Document</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] rounded-xl border border-[#FCD34D]/30">
            <p className="text-sm text-[#92400E] flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Please submit all required documents in PDF format (maximum 5MB
              per file)
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8 space-x-4">
          <button
            className="px-6 py-3 border border-[#024FA8]/20 text-[#024FA8] rounded-xl hover:bg-gradient-to-r hover:from-[#F0F7FF] hover:to-[#E0F2FE] transition-all font-medium"
            onClick={() => navigate("/student/studenttermsandconditions")}
          >
            Back
          </button>
          <button
            className={`px-8 py-3 bg-gradient-to-r rounded-xl transition-all font-medium shadow-sm hover:shadow-md ${
              documents.some((doc) => doc.uploaded)
                ? "from-[#024FA8] to-[#0369A1] text-white hover:from-[#023d82] hover:to-[#025785]"
                : "from-gray-300 to-gray-400 text-white cursor-not-allowed"
            }`}
            onClick={handleSubmitRequirementsClick}
            disabled={!documents.some((doc) => doc.uploaded)}
          >
            Submit Requirements
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentSubmitApplication;
