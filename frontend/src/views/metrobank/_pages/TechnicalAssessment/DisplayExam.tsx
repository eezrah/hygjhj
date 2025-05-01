import React from 'react';
import { ChevronDown } from 'lucide-react';

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

interface DisplayExamProps {
  examData: ExamSection[];
}

function DisplayExam({ examData }: DisplayExamProps) {
  const [expandedSections, setExpandedSections] = React.useState<boolean[]>(
    examData.map(() => true)
  );

  const handleToggleSectionExpand = (sectionIndex: number) => {
    setExpandedSections(prev => {
      const newState = [...prev];
      newState[sectionIndex] = !newState[sectionIndex];
      return newState;
    });
  };

  return (
    <div className="p-8 min-h-screen mx-9">
      <h1 className="text-2xl font-bold text-[#024FA8] mb-6">Exam Preview</h1>
      
      {examData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8 border border-gray-200 rounded-lg bg-white shadow-sm">
          {/* Section Header */}
          <div className="bg-blue-400 p-4 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-blue-500 flex items-center justify-center">
                  {sectionIndex + 1}
                </div>
                <span className="font-medium text-white">{section.examType || `Exam Section ${sectionIndex + 1}`}</span>
              </div>
              <button 
                onClick={() => handleToggleSectionExpand(sectionIndex)}
                className="text-white hover:text-gray-700"
              >
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${expandedSections[sectionIndex] ? '' : 'transform rotate-180'}`}
                />
              </button>
            </div>
          </div>
          
          {expandedSections[sectionIndex] && (
            <div className="p-6">
              {/* Section Details */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Exam Type</label>
                  <div className="w-full p-2 bg-gray-50 rounded-lg text-gray-700">
                    {section.examType}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Exam Directions</label>
                  <div className="w-full p-2 bg-gray-50 rounded-lg text-gray-700">
                    {section.examDirections}
                  </div>
                </div>
              </div>

              {/* Questions in this section */}
              {section.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mt-6 p-5 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-sm">
                      {questionIndex + 1}
                    </div>
                    <span className="text-sm text-gray-500">Question {questionIndex + 1}</span>
                  </div>
                  
                  <div className="grid grid-cols-[2fr,1fr] gap-4 mb-4">
                    <div className="w-full p-2 bg-gray-50 rounded-lg text-gray-700">
                      {question.question}
                    </div>
                    <div className="w-full p-2 bg-gray-50 rounded-lg text-gray-700">
                      {question.type}
                    </div>
                  </div>

                  {question.type === 'Multiple Choice' && (
                    <div className="space-y-3">
                      {question.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`question-${sectionIndex}-${questionIndex}`}
                            disabled
                            checked={option === question.correctAnswer}
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
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayExam; 