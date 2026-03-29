import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Tag, Modal } from "antd";
import { CheckCircle, Circle, BookOpen, MessageSquare, ClipboardList } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  getCourseDetailsApi,
  markModuleCompleteApi,
  type CourseProgress,
  type ModuleProgressItem,
} from "../../services/learnerCourse/learnerCourseService";

export default function CourseViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const fetchCourse = async () => {
    if (!id) return;
    try {
      const res = await getCourseDetailsApi(id);
      if (res.success && res.data) setCourse(res.data);
      else message.error(res.message || "Failed to load course.");
    } catch {
      message.error("Failed to load course.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourse(); }, [id]);

  const handleMarkComplete = async (moduleId: string) => {
    setCompletingId(moduleId);
    try {
      const res = await markModuleCompleteApi(moduleId);
      if (res.success) {
        message.success("Module marked as completed!");
        await fetchCourse();
      } else {
        message.error(res.message || "Failed to mark complete.");
      }
    } catch {
      message.error("Failed to mark complete.");
    } finally {
      setCompletingId(null);
    }
  };

  const confirmComplete = (mod: ModuleProgressItem) => {
    Modal.confirm({
      title: `Complete "${mod.title}"?`,
      content: "Mark this module as completed. This action tracks your progress.",
      okText: "Mark Complete",
      onOk: () => handleMarkComplete(mod.moduleId),
    });
  };

  if (loading) return <LoadingSpinner fullscreen />;
  if (!course) return <p className="p-8 text-gray-500">Course not found.</p>;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{course.courseTitle}</h1>
        <p className="text-gray-500 mt-1">{course.description}</p>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Course Progress</span>
              <span className="font-semibold">{course.progressPercent}%</span>
            </div>
            <div className="bg-gray-200 h-3 rounded-full">
              <div
                className={`h-3 rounded-full transition-all ${course.progressPercent === 100 ? "bg-green-500" : "bg-blue-600"}`}
                style={{ width: `${course.progressPercent}%` }}
              />
            </div>
          </div>
          <Tag color={course.progressPercent === 100 ? "green" : "blue"} className="text-sm">
            {course.completedModules}/{course.totalModules} Modules
          </Tag>
        </div>
      </div>

      {/* Modules list */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Modules</h2>
      <div className="space-y-3 mb-8">
        {course.modules.map((mod, idx) => {
          const isCompleted = mod.status === "COMPLETED";
          return (
            <div
              key={mod.moduleId}
              className={`bg-white rounded-xl p-5 border shadow-sm flex items-center justify-between ${
                isCompleted ? "border-green-200 bg-green-50/30" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                }`}>
                  {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {idx + 1}. {mod.title}
                  </h3>
                  {mod.description && (
                    <p className="text-sm text-gray-500">{mod.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <Tag color={isCompleted ? "green" : "default"} className="text-xs">
                      {isCompleted ? "Completed" : "Not Completed"}
                    </Tag>
                    {mod.hasQuiz && (
                      <Tag color="purple" className="text-xs">Has Quiz</Tag>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isCompleted && (
                  <button
                    onClick={() => confirmComplete(mod)}
                    disabled={completingId === mod.moduleId}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700
                               disabled:opacity-50 transition flex items-center gap-1"
                  >
                    <CheckCircle size={14} />
                    {completingId === mod.moduleId ? "Saving..." : "Mark Complete"}
                  </button>
                )}
                {isCompleted && mod.hasQuiz && mod.quizId && (
                  <button
                    onClick={() => navigate(`/learner/quiz/${mod.quizId}`)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700
                               transition flex items-center gap-1"
                  >
                    <ClipboardList size={14} />
                    Take Quiz
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {course.allModulesCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-3">
            <CheckCircle size={24} className="text-green-600" />
            <div>
              <p className="font-semibold text-green-800">All modules completed!</p>
              <p className="text-sm text-green-600">Complete the quizzes above to finish the course.</p>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate(`/learner/ask`)}
          className="bg-gray-800 text-white px-5 py-3 rounded-xl hover:bg-gray-900
                     transition flex items-center gap-2"
        >
          <MessageSquare size={18} />
          Ask Your Course AI
        </button>
      </div>
    </div>
  );
}
