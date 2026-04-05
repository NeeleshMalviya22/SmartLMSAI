import { useEffect, useState, useRef } from "react";
import { message, Spin } from "antd";
import { SendHorizontal, BookOpen, FileText, Bot, User } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  askCourseApi,
  type AskCourseResponse,
} from "../../services/askCourse/askCourseService";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  excerpt?: string;
  sourceDocument?: string;
  timestamp: Date;
}

export default function AskYourCourse() {
  const { id } = useParams(); // ✅ get courseId from route
  const courseId = id as string;

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    if (!courseId) {
      message.error("Invalid course id.");
      return;
    }

    const trimmed = question.trim();
    if (!trimmed) {
      message.warning("Please enter a question.");
      return;
    }

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await askCourseApi({
        courseId: courseId, // ✅ using route id
        question: trimmed,
      });

      if (res.success && res.data) {
        const aiData: AskCourseResponse = res.data;

        const aiMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "ai",
          content: aiData.answer,
          excerpt: aiData.excerpt,
          sourceDocument: aiData.sourceDocument,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "ai",
          content:
            res.message ||
            "Sorry, I could not find an answer to your question.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      message.error("Failed to get AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bot className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">
            Ask Your Course
          </h2>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
            <Bot size={48} />
            <p className="text-lg">Ask anything about your course</p>
            <p className="text-sm">
              Answers are grounded in uploaded course materials
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.role === "user" ? (
                  <User size={14} />
                ) : (
                  <Bot size={14} className="text-blue-600" />
                )}
                <span className="text-xs opacity-70">
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </span>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.content}
              </p>

              {msg.excerpt && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-1">
                    <FileText size={12} />
                    Supporting Excerpt
                  </div>
                  <p className="text-xs text-gray-700 italic">
                    "{msg.excerpt}"
                  </p>
                </div>
              )}

              {msg.sourceDocument && (
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <FileText size={11} />
                  Source: {msg.sourceDocument}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <Spin size="small" />
                <span className="text-sm text-gray-500">
                  Analyzing course documents...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your course..."
            disabled={loading}
            rows={2}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 resize-none
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       disabled:opacity-50 disabled:bg-gray-50 text-sm"
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                       flex items-center justify-center"
          >
            <SendHorizontal size={20} />
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-2 text-center">
          Responses are generated from uploaded course documents only
        </p>
      </div>
    </div>
  );
}