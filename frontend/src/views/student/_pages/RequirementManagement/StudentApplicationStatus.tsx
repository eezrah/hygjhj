import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DocumentItem {
  name: string;
  file: string;
  uploaded: boolean;
}

export default function StudentApplicationStatus() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedDocuments = localStorage.getItem("applicationDocuments");
    if (savedDocuments) {
      const docs = JSON.parse(savedDocuments);
      const updatedDocs = docs.map((doc: DocumentItem) => {
        if (
          doc.name.toLowerCase().includes("application form") &&
          !doc.uploaded
        ) {
          doc.uploaded = true;
        }
        return doc;
      });
      setDocuments(updatedDocs);
    }
  }, []);

  const handleBackClick = () => {
    navigate("/student/studentdashboard");
  };

  const coverLetter = documents.find((doc) =>
    doc.name.toLowerCase().includes("cover letter")
  );
  const formCompletionPercent = 50 + (coverLetter?.uploaded ? 50 : 0);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]">
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Step Progress */}
        <div className="flex justify-center space-x-16 mb-8">
          {[
            "Details and Eligibility",
            "Submit your Application",
            "Application Status",
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${
                  index === 2
                    ? "bg-gradient-to-r from-[#024FA8] to-[#0369A1]"
                    : "bg-gradient-to-r from-[#93C5FD] to-[#BFDBFE]"
                }`}
              >
                {index + 1}
              </div>
              <p
                className={`text-sm ${
                  index === 2
                    ? "bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent font-bold"
                    : "text-[#0369A1]"
                }`}
                mt-2
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Container */}
        <div className="flex space-x-6 max-w-full overflow-x-hidden">
          {/* Documents List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-8 border border-[#024FA8]/10 flex-1 h-[362px] overflow-auto">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-[#024FA8]" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent">
                Documents
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
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-3">
                      <FileText
                        className={`w-5 h-5 ${
                          doc.uploaded ? "text-[#0369A1]" : "text-[#64748B]"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          doc.uploaded ? "text-[#0369A1]" : "text-[#334155]"
                        }`}
                      >
                        {doc.name}
                      </span>
                      {doc.name.toLowerCase().includes("application form") && (
                        <button
                          onClick={() => navigate("/student/studentapplicationform")}
                          className=" ml-60 text-sm text-[#024FA8] underline hover:text-[#0369A1] transition-colors"
                        >
                          View Application Form
                        </button>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      doc.uploaded ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {doc.uploaded ? "Complete" : "Incomplete"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Status Panel */}
          <div className="flex flex-col space-y-6 w-1/3">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-[#024FA8]/10 text-center">
              <p className="text-[#64748B] text-sm mb-2">Submission Status</p>
              <p
                className={`font-bold text-xl ${
                  formCompletionPercent === 100
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                {formCompletionPercent === 100 ? "Complete" : "Incomplete"}
              </p>
              <div className="w-16 h-16 mx-auto mt-4 rounded-full border-4 border-[#0369A1] flex items-center justify-center">
                <span className="bg-gradient-to-r from-[#024FA8] to-[#0369A1] bg-clip-text text-transparent font-bold">
                  {formCompletionPercent}%
                </span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-[#024FA8]/10 text-center">
              <p className="text-[#64748B] text-sm mb-2">Application Status</p>
              <p className="text-[#EAB308] font-bold text-xl">
                For Application Verification
              </p>
              <div className="w-8 h-8 mx-auto mt-4 rounded-full bg-[#EAB308]"></div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="px-9 py-3 bg-gradient-to-r from-[#024FA8] to-[#0369A1] text-white rounded-xl transition-all font-medium shadow-sm hover:shadow-md hover:from-[#023d82] hover:to-[#025785]"
                onClick={handleBackClick}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
