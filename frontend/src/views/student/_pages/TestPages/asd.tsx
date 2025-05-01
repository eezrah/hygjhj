import React, { useState } from 'react';
import axios from 'axios';

// Define response types
interface TechnicalAssessment {
  technicalassessmentid: number;
  technicalassessmentname: string;
  creationdate: string;
}

interface MultipleChoiceQuestion {
  mc_questionid: number;
  mc_questiontext: string;
  mc_correctanswer: string;
  choices: Array<{
    choiceId: number;
    choiceText: string;
  }>;
}

interface CodingQuestion {
  codequestionid: number;
  codingquestiontext: string;
  correctreferencecode: string | null;
  testcases: Array<{
    testCaseId: number;
    input: string;
    expectedOutput: string;
  }>;
}

interface EssayQuestion {
  essayid: number;
  essayquestion: string;
}

// API Endpoints Example Component
const TechnicalAssessmentManagement: React.FC = () => {
  // State for storing data
  const [assessments, setAssessments] = useState<TechnicalAssessment[]>([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<number | null>(null);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState<MultipleChoiceQuestion[]>([]);
  const [codingQuestions, setCodingQuestions] = useState<CodingQuestion[]>([]);
  const [essayQuestions, setEssayQuestions] = useState<EssayQuestion[]>([]);
  
  // Example handlers for the API calls
  const getAllAssessments = async () => {
    try {
      // Get all technical assessments
      const response = await axios.get<{success: boolean, data: TechnicalAssessment[]}>('/api/student/technical-assessments');
      console.log('All assessments:', response.data);
      setAssessments(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  const createAssessment = async () => {
    const assessmentName = prompt('Enter assessment name:');
    if (!assessmentName) return;
    
    try {
      // Create a new technical assessment
      const response = await axios.post<{success: boolean, message: string, assessmentId: number}>('/api/student/technical-assessment', {
        assessmentName
      });
      console.log('Created assessment:', response.data);
      alert(`Assessment created with ID: ${response.data.assessmentId}`);
      // Refresh the list
      getAllAssessments();
      return response.data;
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };

  const getAssessment = async (assessmentId: number) => {
    try {
      // Get a specific technical assessment
      const response = await axios.get<{success: boolean, data: TechnicalAssessment}>(`/api/student/technical-assessment/${assessmentId}`);
      console.log('Assessment details:', response.data);
      setSelectedAssessmentId(assessmentId);
      return response.data;
    } catch (error) {
      console.error(`Error fetching assessment ${assessmentId}:`, error);
    }
  };

  const getMultipleChoiceQuestions = async (technicalAssessmentId: number) => {
    try {
      // Get multiple choice questions for an assessment
      const response = await axios.get<{success: boolean, data: MultipleChoiceQuestion[]}>(`/api/student/technical-assessment/${technicalAssessmentId}/multiple-choice`);
      console.log('Multiple choice questions:', response.data);
      setMultipleChoiceQuestions(response.data.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching multiple choice questions for assessment ${technicalAssessmentId}:`, error);
    }
  };

  const createMultipleChoiceQuestion = async () => {
    if (!selectedAssessmentId) {
      alert('Please select an assessment first');
      return;
    }
    
    const questionText = prompt('Enter question text:');
    const correctAnswerText = prompt('Enter correct answer:');
    const choicesText = prompt('Enter choices (comma separated):');
    
    if (!questionText || !correctAnswerText || !choicesText) return;
    
    const choices = choicesText.split(',').map(choice => choice.trim());
    
    try {
      // Create a multiple choice question
      const response = await axios.post<{success: boolean, message: string, questionId: number}>('/api/student/technical-assessment/multiple-choice', {
        technicalAssessmentId: selectedAssessmentId,
        questionText,
        correctAnswerText,
        choices
      });
      console.log('Created multiple choice question:', response.data);
      alert(`Question created with ID: ${response.data.questionId}`);
      // Refresh questions
      getMultipleChoiceQuestions(selectedAssessmentId);
      return response.data;
    } catch (error) {
      console.error('Error creating multiple choice question:', error);
    }
  };

  const getCodingQuestions = async (technicalAssessmentId: number) => {
    try {
      // Get coding questions for an assessment
      const response = await axios.get<{success: boolean, data: CodingQuestion[]}>(`/api/student/technical-assessment/${technicalAssessmentId}/coding`);
      console.log('Coding questions:', response.data);
      setCodingQuestions(response.data.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching coding questions for assessment ${technicalAssessmentId}:`, error);
    }
  };

  const createCodingQuestion = async () => {
    if (!selectedAssessmentId) {
      alert('Please select an assessment first');
      return;
    }
    
    const codeQuestionText = prompt('Enter coding question:');
    const correctReferenceCode = prompt('Enter reference solution (optional):');
    
    if (!codeQuestionText) return;
    
    try {
      // Create a coding question
      const response = await axios.post<{success: boolean, message: string, codingQuestionId: number}>('/api/student/technical-assessment/coding', {
        technicalAssessmentId: selectedAssessmentId,
        codeQuestionText,
        correctReferenceCode: correctReferenceCode || undefined
      });
      console.log('Created coding question:', response.data);
      alert(`Coding question created with ID: ${response.data.codingQuestionId}`);
      // Refresh questions
      getCodingQuestions(selectedAssessmentId);
      return response.data;
    } catch (error) {
      console.error('Error creating coding question:', error);
    }
  };

  const createCodingTestCase = async () => {
    const codeQuestionId = prompt('Enter coding question ID:');
    if (!codeQuestionId) return;
    
    const testCaseInput = prompt('Enter test case input:');
    const testCaseExpectedOutput = prompt('Enter expected output:');
    
    if (!testCaseInput || !testCaseExpectedOutput) return;
    
    try {
      // Create a coding test case
      const response = await axios.post<{success: boolean, message: string, testCaseId: number}>('/api/student/technical-assessment/coding/test-case', {
        codeQuestionId: parseInt(codeQuestionId),
        testCaseInput,
        testCaseExpectedOutput
      });
      console.log('Created coding test case:', response.data);
      alert(`Test case created with ID: ${response.data.testCaseId}`);
      // Refresh coding questions if we have an assessment selected
      if (selectedAssessmentId) {
        getCodingQuestions(selectedAssessmentId);
      }
      return response.data;
    } catch (error) {
      console.error('Error creating coding test case:', error);
    }
  };

  const getEssayQuestions = async (technicalAssessmentId: number) => {
    try {
      // Get essay questions for an assessment
      const response = await axios.get<{success: boolean, data: EssayQuestion[]}>(`/api/student/technical-assessment/${technicalAssessmentId}/essay`);
      console.log('Essay questions:', response.data);
      setEssayQuestions(response.data.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching essay questions for assessment ${technicalAssessmentId}:`, error);
    }
  };

  const createEssayQuestion = async () => {
    if (!selectedAssessmentId) {
      alert('Please select an assessment first');
      return;
    }
    
    const essayQuestionText = prompt('Enter essay question:');
    if (!essayQuestionText) return;
    
    try {
      // Create an essay question
      const response = await axios.post<{success: boolean, message: string, essayQuestionId: number}>('/api/student/technical-assessment/essay', {
        technicalAssessmentId: selectedAssessmentId,
        essayQuestionText
      });
      console.log('Created essay question:', response.data);
      alert(`Essay question created with ID: ${response.data.essayQuestionId}`);
      // Refresh questions
      getEssayQuestions(selectedAssessmentId);
      return response.data;
    } catch (error) {
      console.error('Error creating essay question:', error);
    }
  };

  // Load all data when assessment is selected
  const loadAllData = (assessmentId: number) => {
    getAssessment(assessmentId);
    getMultipleChoiceQuestions(assessmentId);
    getCodingQuestions(assessmentId);
    getEssayQuestions(assessmentId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Technical Assessment Management</h1>
      
      <div className="mb-6 space-x-3">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" 
          onClick={getAllAssessments}
        >
          Load All Assessments
        </button>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" 
          onClick={createAssessment}
        >
          Create New Assessment
        </button>
      </div>
      
      {assessments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Available Assessments</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {assessments.map(assessment => (
                <li key={assessment.technicalassessmentid} className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-medium">{assessment.technicalassessmentname}</span>
                    <span className="ml-3 text-sm text-gray-500">Created: {assessment.creationdate}</span>
                  </div>
                  <button 
                    onClick={() => loadAllData(assessment.technicalassessmentid)}
                    className="bg-blue-100 text-blue-700 py-1 px-3 rounded hover:bg-blue-200"
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {selectedAssessmentId && (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold">Selected Assessment ID: {selectedAssessmentId}</h2>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Multiple Choice Questions</h3>
              <button 
                onClick={createMultipleChoiceQuestion}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
              >
                Add Multiple Choice Question
              </button>
            </div>
            {multipleChoiceQuestions.length > 0 ? (
              <ul className="space-y-4 mt-3">
                {multipleChoiceQuestions.map(question => (
                  <li key={question.mc_questionid} className="border rounded p-3 bg-gray-50">
                    <p className="font-medium">{question.mc_questiontext}</p>
                    <p className="text-sm text-green-600 mt-1">Correct answer: {question.mc_correctanswer}</p>
                    <p className="text-sm font-medium mt-2">Choices:</p>
                    <ul className="list-disc ml-5 mt-1">
                      {question.choices.map(choice => (
                        <li key={choice.choiceId} className="text-sm">
                          {choice.choiceText}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No multiple choice questions available</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Coding Questions</h3>
              <div className="space-x-2">
                <button 
                  onClick={createCodingQuestion}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
                >
                  Add Coding Question
                </button>
                <button 
                  onClick={createCodingTestCase}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                >
                  Add Test Case
                </button>
              </div>
            </div>
            {codingQuestions.length > 0 ? (
              <ul className="space-y-5 mt-3">
                {codingQuestions.map(question => (
                  <li key={question.codequestionid} className="border rounded p-3 bg-gray-50">
                    <p className="font-medium">Question ID: {question.codequestionid}</p>
                    <p className="mt-1">{question.codingquestiontext}</p>
                    {question.correctreferencecode && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Reference Solution:</p>
                        <pre className="bg-gray-800 text-green-400 p-2 rounded text-sm mt-1 overflow-x-auto">
                          {question.correctreferencecode}
                        </pre>
                      </div>
                    )}
                    <div className="mt-3">
                      <p className="text-sm font-medium">Test Cases:</p>
                      {question.testcases.length > 0 ? (
                        <ul className="mt-1 space-y-1">
                          {question.testcases.map(testCase => (
                            <li key={testCase.testCaseId} className="text-sm">
                              <span className="font-medium">Input:</span> {testCase.input} 
                              <span className="mx-1">→</span> 
                              <span className="font-medium">Expected:</span> {testCase.expectedOutput}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 text-sm">No test cases available</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No coding questions available</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Essay Questions</h3>
              <button 
                onClick={createEssayQuestion}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
              >
                Add Essay Question
              </button>
            </div>
            {essayQuestions.length > 0 ? (
              <ul className="space-y-3 mt-3">
                {essayQuestions.map(question => (
                  <li key={question.essayid} className="border rounded p-3 bg-gray-50">
                    <p>{question.essayquestion}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No essay questions available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicalAssessmentManagement;