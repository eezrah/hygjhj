import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SquarePen, ChevronLeft } from "lucide-react";

interface Question {
  question: string;
  type: 'Multiple Choice' | 'Paragraph / Coding';
  options?: string[];
  correctAnswer?: string;
}

interface ExamSection {
  examType: string;
  examDirections: string;
  questions: Question[];
  isExpanded: boolean;
}

const QuestionE: React.FC = () => {
  const navigate = useNavigate();
  const [examData, setExamData] = useState<ExamSection[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    // Add JDoodle script
    const script = document.createElement('script');
    script.src = 'https://www.jdoodle.com/assets/jdoodle-pym.min.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Get exam data from sessionStorage
    const storedExamData = sessionStorage.getItem('studentExamData');
    if (storedExamData) {
      const parsedData = JSON.parse(storedExamData);
      setExamData(parsedData);
      // Assuming we want to show the first question from the first section
      if (parsedData[0]?.questions[0]) {
        setCurrentQuestion(parsedData[0].questions[0]);
      }
    }

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleNext = () => {
    navigate("/student/technicalassessment/results");
  };

  const handleBack = () => {
    navigate("/student/technicalassessment/questiond");
  };

  const handleQuestionNavigation = (questionNumber: number) => {
    switch (questionNumber) {
      case 1:
        navigate("/student/technicalassessment/questiona");
        break;
      case 2:
        navigate("/student/technicalassessment/questionb");
        break;
      case 3:
        navigate("/student/technicalassessment/questionc");
        break;
      case 4:
        navigate("/student/technicalassessment/questiond");
        break;
      case 5:
        navigate("/student/technicalassessment/questione");
        break;
      default:
        break;
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 min-h-screen mx-9">
      {/* Progress Tracker */}
      <div className="flex justify-center py-6">
        <div className="flex items-center space-x-16">
          <div className="flex flex-col items-center relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white border-2 border-blue-600 font-semibold text-sm">
              1
            </div>
            <span className="text-xs text-blue-600 mt-2">Overview</span>
            <div className="absolute top-5 left-full w-28 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col items-center relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white border-2 border-blue-600 font-semibold text-sm">
              2
            </div>
            <span className="text-xs text-blue-600 mt-2">Technical Assessment</span>
            <div className="absolute top-5 left-full w-28 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 font-semibold text-sm">
              3
            </div>
            <span className="text-xs text-blue-600 mt-2">Results</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar Navigation */}
        <div className="w-64 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-blue-600 font-medium mb-3">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span>Multiple Choice</span>
            </div>

            <div className="ml-6 space-y-3">
              {examData[0]?.questions.map((question, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 text-blue-600 cursor-pointer hover:bg-blue-50 p-2 rounded"
                  onClick={() => handleQuestionNavigation(index + 1)}
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm">Question {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 border border-gray-200 rounded-lg bg-white shadow-sm p-6">
          <div className="flex items-center mb-4">
            <SquarePen className="text-blue-600 mr-2 w-6 h-6" />
            <h2 className="text-lg font-semibold text-blue-600">{examData[0]?.examType}</h2>
          </div>

          <p className="text-gray-500 text-sm italic mb-6">
            {examData[0]?.examDirections}
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Question 5</h3>
            <p className="text-gray-700 mb-4">
              {currentQuestion.question}
            </p>
            <div className="border-b border-blue-400 mb-6"></div>

            {currentQuestion.type === 'Paragraph / Coding' ? (
              <div className="mb-6">
                <div data-pym-src="https://www.jdoodle.com/embed/v1/13554eae0417a781"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="answer"
                      className="w-4 h-4 text-[#024FA8]"
                    />
                    <div className="flex-1 p-2 bg-gray-50 rounded-lg text-gray-700">
                      {option}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-600 border-2 border-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-[#eef5ff]"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-[#024FA8] text-white px-6 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionE;
