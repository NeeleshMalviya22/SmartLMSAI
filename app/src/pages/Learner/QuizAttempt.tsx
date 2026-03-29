import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Modal, Tag } from "antd";
import { CheckCircle, XCircle, Trophy, ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  getQuizApi,
  submitQuizApi,
  type QuizData,
  type QuizResult,
} from "../../services/learnerCourse/learnerCourseService";

export default function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      try {
        const res = await getQuizApi(id);
        if (res.success && res.data) setQuiz(res.data);
        else message.error(res.message || "Failed to load quiz.");
      } catch {
        message.error("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSelect = (questionId: string, optionId: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    if (!quiz) return;

    const unanswered = quiz.questions.filter((q) => !answers[q.questionId]);
    if (unanswered.length > 0) {
      message.warning(`Please answer all questions. ${unanswered.length} remaining.`);
      return;
    }

    Modal.confirm({
      title: "Submit Quiz?",
      content: "Once submitted, you cannot change your answers.",
      okText: "Submit",
      onOk: async () => {
        setSubmitting(true);
        try {
          const answerList = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
            questionId,
            selectedOptionId,
          }));
          const res = await submitQuizApi(quiz.quizId, answerList);
          if (res.success && res.data) {
            setResult(res.data);
          } else {
            message.error(res.message || "Failed to submit quiz.");
          }
        } catch {
          message.error("Failed to submit quiz.");
        } finally {
          setSubmitting(false);
        }
      },
    });
  };

  if (loading) return <LoadingSpinner fullscreen />;
  if (!quiz) return <p className="p-8 text-gray-500">Quiz not found.</p>;

  if (result) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className={`rounded-2xl p-8 text-center border-2 ${
          result.passed
            ? "bg-green-50 border-green-300"
            : "bg-red-50 border-red-300"
        }`}>
          <div className="mb-4">
            {result.passed ? (
              <Trophy size={64} className="text-green-500 mx-auto" />
            ) : (
              <XCircle size={64} className="text-red-500 mx-auto" />
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {result.passed ? "Congratulations! You Passed!" : "Quiz Not Passed"}
          </h2>

          <div className="flex justify-center gap-4 my-6">
            <div className="bg-white rounded-xl p-4 shadow-sm min-w-[120px]">
              <p className="text-3xl font-bold text-gray-800">{result.score}%</p>
              <p className="text-sm text-gray-500">Your Score</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm min-w-[120px]">
              <p className="text-3xl font-bold text-gray-800">
                {result.correctAnswers}/{result.totalQuestions}
              </p>
              <p className="text-sm text-gray-500">Correct</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm min-w-[120px]">
              <p className="text-3xl font-bold text-gray-800">{result.passingScore}%</p>
              <p className="text-sm text-gray-500">Passing Score</p>
            </div>
          </div>

          <Tag color={result.passed ? "green" : "red"} className="text-base px-4 py-1">
            {result.passed ? "PASSED" : "FAILED"}
          </Tag>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition
                         flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} />
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
          {quiz.description && <p className="text-gray-500 mt-1">{quiz.description}</p>}
        </div>
        <Tag color="blue" className="text-sm">
          {answeredCount}/{quiz.questions.length} Answered
        </Tag>
      </div>

      <div className="space-y-6 mb-8">
        {quiz.questions.map((q, qIdx) => (
          <div key={q.questionId} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 font-bold text-sm rounded-full w-8 h-8
                              flex items-center justify-center flex-shrink-0">
                {qIdx + 1}
              </span>
              <div>
                <p className="font-medium text-gray-800">{q.questionText}</p>
                <Tag className="mt-1 text-xs">{q.questionType === "TRUE_FALSE" ? "True/False" : "Multiple Choice"}</Tag>
              </div>
            </div>

            <div className="space-y-2 ml-11">
              {q.options.map((opt) => {
                const isSelected = answers[q.questionId] === opt.optionId;
                return (
                  <button
                    key={opt.optionId}
                    onClick={() => handleSelect(q.questionId, opt.optionId)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition text-sm ${
                      isSelected
                        ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "border-blue-500" : "border-gray-300"
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                      </div>
                      {opt.optionText}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-white rounded-xl p-4 border shadow-sm sticky bottom-4">
        <p className="text-sm text-gray-500">
          Passing score: <span className="font-semibold">{quiz.passingScore}%</span>
        </p>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-xl hover:bg-blue-700
                     disabled:opacity-50 transition font-medium flex items-center gap-2"
        >
          <CheckCircle size={18} />
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
}
