import React, { useState } from "react";
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

const QuestionC: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
  const navigate = useNavigate();

  // Mock data - In a real application, this would come from an API or state management
  const examSection: ExamSection = {
    examType: "Technical Assessment",
    examDirections: "Select the correct answer for each logical problem-solving question.",
    questions: [
      {
        question: "If a train travels 300 kilometers in 4 hours, what is its average speed in kilometers per hour?",
        type: "Multiple Choice",
        options: ["60 km/h", "75 km/h", "80 km/h", "90 km/h"],
        correctAnswer: "75 km/h"
      }
    ],
    isExpanded: true
  };

  const currentQuestion = examSection.questions[0];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswerSelected(true);
  };

  const handleNext = () => {
    navigate("/student/technicalassessment/questiond");
  };

  const handleBack = () => {
    navigate("/student/technicalassessment/questionb");
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
              <div 
                className="flex items-center space-x-2 text-blue-600 cursor-pointer hover:bg-blue-50 p-2 rounded"
                onClick={() => handleQuestionNavigation(1)}
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm">Question 1</span>
              </div>
              <div 
                className="flex items-center space-x-2 text-blue-600 cursor-pointer hover:bg-blue-50 p-2 rounded"
                onClick={() => handleQuestionNavigation(2)}
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm">Question 2</span>
              </div>
              <div 
                className="flex items-center space-x-2 text-blue-600 cursor-pointer hover:bg-blue-50 p-2 rounded"
                onClick={() => handleQuestionNavigation(3)}
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm">Question 3</span>
              </div>
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:bg-blue-50 p-2 rounded"
                onClick={() => handleQuestionNavigation(4)}
              >
                <div className="w-3 h-3 border border-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Question 4</span>
              </div>
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:bg-blue-50 p-2 rounded"
                onClick={() => handleQuestionNavigation(5)}
              >
                <div className="w-3 h-3 border border-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Question 5</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-blue-600 font-medium mb-3">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span>Essay</span>
            </div>

            <div className="ml-6 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Question 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Question 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 border border-gray-200 rounded-lg bg-white shadow-sm p-6">
          <div className="flex items-center mb-4">
            <SquarePen className="text-blue-600 mr-2 w-6 h-6" />
            <h2 className="text-lg font-semibold text-blue-600">{examSection.examType}</h2>
          </div>

          <p className="text-gray-500 text-sm italic mb-6">
            {examSection.examDirections}
          </p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Question 3</h3>
            <p className="text-gray-700 mb-4">
              {currentQuestion.question}
            </p>
            <div className="border-b border-blue-400 mb-6"></div>

            <div className="space-y-4">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`option${index + 1}`}
                    name="question"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="mr-3 h-4 w-4 text-blue-600"
                  />
                  <label htmlFor={`option${index + 1}`} className="text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
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
              disabled={!isAnswerSelected}
              className="bg-[#024FA8] text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionC;
