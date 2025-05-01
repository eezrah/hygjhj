import React, { useState } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

function CreateExam() {
  const navigate = useNavigate();
  const [examSections, setExamSections] = useState<ExamSection[]>([
    { examType: '', examDirections: '', questions: [], isExpanded: true }
  ]);
  
  const [currentSection, setCurrentSection] = useState<number | null>(0);
  const [currentType, setCurrentType] = useState<'Multiple Choice' | 'Paragraph / Coding'>('Multiple Choice');
  const [options, setOptions] = useState<string[]>(['']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddOption = (sectionIndex: number) => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleExamTypeChange = (sectionIndex: number, value: string) => {
    const updatedSections = [...examSections];
    updatedSections[sectionIndex].examType = value;
    setExamSections(updatedSections);
  };

  const handleExamDirectionsChange = (sectionIndex: number, value: string) => {
    const updatedSections = [...examSections];
    updatedSections[sectionIndex].examDirections = value;
    setExamSections(updatedSections);
  };

  const handleAddExamType = () => {
    const newSection = { 
      examType: '', 
      examDirections: '', 
      questions: [], 
      isExpanded: true 
    };
    
    // Collapse all current sections
    const updatedSections = examSections.map(section => ({
      ...section,
      isExpanded: false
    }));
    
    setExamSections([...updatedSections, newSection]);
    setCurrentSection(updatedSections.length);
  };

  const handleAddQuestion = (sectionIndex: number) => {
    if (!examSections[sectionIndex].examType) return;
    
    const newQuestion: Question = {
      question: '',
      type: 'Multiple Choice',
      options: [''],
    };

    const updatedSections = [...examSections];
    updatedSections[sectionIndex].questions.push(newQuestion);
    setExamSections(updatedSections);
  };

  const handleUpdateQuestion = (sectionIndex: number, questionIndex: number, value: string) => {
    const updatedSections = [...examSections];
    updatedSections[sectionIndex].questions[questionIndex].question = value;
    setExamSections(updatedSections);
  };

  const handleUpdateQuestionType = (sectionIndex: number, questionIndex: number, value: 'Multiple Choice' | 'Paragraph / Coding') => {
    const updatedSections = [...examSections];
    updatedSections[sectionIndex].questions[questionIndex].type = value;
    
    // Reset options based on question type
    if (value === 'Multiple Choice') {
      updatedSections[sectionIndex].questions[questionIndex].options = [''];
    } else {
      delete updatedSections[sectionIndex].questions[questionIndex].options;
    }
    
    setExamSections(updatedSections);
  };

  const handleUpdateOption = (sectionIndex: number, questionIndex: number, optionIndex: number, value: string) => {
    const updatedSections = [...examSections];
    if (!updatedSections[sectionIndex].questions[questionIndex].options) {
      updatedSections[sectionIndex].questions[questionIndex].options = [''];
    }
    updatedSections[sectionIndex].questions[questionIndex].options![optionIndex] = value;
    setExamSections(updatedSections);
  };

  const handleAddOptionToQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...examSections];
    if (!updatedSections[sectionIndex].questions[questionIndex].options) {
      updatedSections[sectionIndex].questions[questionIndex].options = [''];
    } else {
      updatedSections[sectionIndex].questions[questionIndex].options!.push('');
    }
    setExamSections(updatedSections);
  };

  const handleUpdateCorrectAnswer = (sectionIndex: number, questionIndex: number, value: string) => {
    const updatedSections = [...examSections];
    updatedSections[sectionIndex].questions[questionIndex].correctAnswer = value;
    setExamSections(updatedSections);
  };

  const handleRemoveQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...examSections];
    updatedSections[sectionIndex].questions.splice(questionIndex, 1);
    setExamSections(updatedSections);
  };

  const handleToggleSectionExpand = (sectionIndex: number) => {
    const updatedSections = [...examSections];
    updatedSections[sectionIndex].isExpanded = !updatedSections[sectionIndex].isExpanded;
    setExamSections(updatedSections);
  };

  const handleRemoveSection = (sectionIndex: number) => {
    if (examSections.length === 1) return; // Don't remove the last section
    const updatedSections = [...examSections];
    updatedSections.splice(sectionIndex, 1);
    setExamSections(updatedSections);
  };

  const handleRemoveOption = (sectionIndex: number, questionIndex: number, optionIndex: number) => {
    const updatedSections = [...examSections];
    if (updatedSections[sectionIndex].questions[questionIndex].options) {
      updatedSections[sectionIndex].questions[questionIndex].options!.splice(optionIndex, 1);
      setExamSections(updatedSections);
    }
  };

  const handleSubmit = () => {
    // Store the exam data in sessionStorage
    sessionStorage.setItem('examData', JSON.stringify(examSections));
    
    // Navigate to the display view
    navigate('metrobank/technicalassessment/displayexam');
  };

  return (
    <div className="p-8 min-h-screen mx-9">
      <h1 className="text-2xl font-bold text-[#024FA8] mb-6">Create Exam</h1>
      
      {examSections.map((section, sectionIndex) => (
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
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleRemoveSection(sectionIndex)}
                  className="text-white hover:text-gray-700"
                >
                  <X size={18} />
                </button>
                <button 
                  onClick={() => handleToggleSectionExpand(sectionIndex)}
                  className="text-white hover:text-gray-700"
                >
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${section.isExpanded ? '' : 'transform rotate-180'}`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {section.isExpanded && (
            <div className="p-6">
              {/* Section Details */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Exam Type</label>
                  <input
                    type="text"
                    value={section.examType}
                    onChange={(e) => handleExamTypeChange(sectionIndex, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2  focus:ring-1 focus:ring-blue-300 outline-none text-gray-500"
                    placeholder="e.g., Quiz, Midterm, Final Exam"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Exam Directions</label>
                  <input
                    type="text"
                    value={section.examDirections}
                    onChange={(e) => handleExamDirectionsChange(sectionIndex, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-300 outline-none text-gray-500"
                    placeholder="Instructions for this section"
                  />
                </div>
              </div>

              {/* Questions in this section */}
              {section.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mt-6 p-5 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-sm">
                        {questionIndex + 1}
                      </div>
                      <span className="text-sm text-gray-500">Question {questionIndex + 1}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveQuestion(sectionIndex, questionIndex)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-[2fr,1fr] gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => handleUpdateQuestion(sectionIndex, questionIndex, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400 outline-none text-gray-500"
                        placeholder="Enter your question"
                      />
                    </div>
                    <div>
                      <select
                        value={question.type}
                        onChange={(e) => handleUpdateQuestionType(sectionIndex, questionIndex, e.target.value as 'Multiple Choice' | 'Paragraph / Coding')}
                        className="w-full border border-gray-300 rounded-lg p-2  focus:ring-1 focus:ring-blue-400 outline-none text-gray-400"
                      >
                        <option>Multiple Choice</option>
                        <option>Paragraph / Coding</option>
                      </select>
                    </div>
                  </div>

                  {question.type === 'Multiple Choice' ? (
                    <div className="space-y-3">
                      {question.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`question-${sectionIndex}-${questionIndex}`}
                            className="w-4 h-4 text-[#024FA8]"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleUpdateOption(sectionIndex, questionIndex, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-400 outline-none text-gray-400"
                          />
                          <button
                            onClick={() => handleRemoveOption(sectionIndex, questionIndex, optionIndex)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddOptionToQuestion(sectionIndex, questionIndex)}
                        className="text-[#024FA8] flex items-center gap-1 text-sm"
                      >
                        + Add option
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}

              {/* Add Question Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleAddQuestion(sectionIndex)}
                  className="flex items-center gap-2 text-blue-600 border-2 border-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-[#eef5ff]"
                >
                  <Plus size={16} />
                  Add Question
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Exam Type Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAddExamType}
          className="flex items-center gap-2 text-blue-600 border-2 border-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-[#eef5ff]"
        >
          <Plus size={16} />
          Add Section
        </button>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-[#024FA8] text-white px-6 py-2 rounded-lg"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}

export default CreateExam;