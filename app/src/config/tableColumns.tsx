import { Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table/interface";
import type { Course, Module, Learner, Quiz, DocumentItem, Question } from "../types/types";
import StatusTag from "../components/common/StatusTag";

/**
 * Course Management Columns
 */
export const courseColumns: ColumnsType<Course> = [
  {
    title: "Course",
    dataIndex: "title",
    sorter: true,
  },
  {
    title: "Modules",
    dataIndex: "moduleCount",
    sorter: true,
  },
  {
    title: "Module Names",
    dataIndex: "moduleNames",
    sorter: true,
    ellipsis: true,
    render: (modules?: string) => (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {modules
          ?.split(",")
          .map((m: string) => m.trim())
          .map((m) => (
            <Tag key={m} color="geekblue">
              {m}
            </Tag>
          ))}
      </div>
    ),
  },
  {
    title: "Learners",
    dataIndex: "learnerCount",
    sorter: true,
  },
  {
    title: "Created Date",
    dataIndex: "createdOn",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    render: (val: boolean) => <StatusTag active={val} />,
  },
];

/**
 * Module Management Columns
 */
export const moduleColumns: ColumnsType<Module> = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: true,
  },
  {
    title: "Course",
    dataIndex: "courseName",
    sorter: true,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Created On",
    dataIndex: "createdOn",
  },
];

/**
 * Learner Management Columns
 */
export const learnerColumns: ColumnsType<Learner> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: true,
  },
  {
    title: "Courses",
    dataIndex: "courseTitle",
  },
  {
    title: "Created On",
    dataIndex: "createdOn",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    render: (val: boolean) => <StatusTag active={val} />,
  },
];

/**
 * Document Management Columns
 */
export const documentColumns: ColumnsType<DocumentItem> = [
  {
    title: "File Name",
    dataIndex: "fileName",
    sorter: true,
  },
  {
    title: "Module",
    dataIndex: "moduleName",
  },
  {
    title: "Created On",
    dataIndex: "createdOn",
  },
];

/**
 * Base Quiz Management Columns (without Questions column)
 */
const baseQuizColumns: ColumnsType<Quiz> = [
  {
    title: "Quiz Title",
    dataIndex: "title",
    sorter: true,
  },
  {
    title: "Module",
    dataIndex: "moduleTitle",
  },
  {
    title: "Passing Score",
    dataIndex: "passingScore",
    render: (val: number) => `${val}%`,
  },
];

/**
 * Quiz Management Columns with navigation
 * Factory function to create quiz columns with navigate callback
 */
export function getQuizColumnsWithNavigation(navigate: (path: string) => void): ColumnsType<Quiz> {
  return [
    ...baseQuizColumns,
    {
      title: "Questions",
      render: (_: unknown, record: Quiz) => (
        <Button
          type="link"
          onClick={() => navigate(`/admin/questions/${record.quizId}`)}
        >
          Manage Questions
        </Button>
      ),
    },
  ];
}

/**
 * Quiz Question Management Columns
 */
export const questionColumns: ColumnsType<Question> = [
  {
    title: "Question",
    dataIndex: "questionText",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "questionType",
  },
  {
    title: "Options",
    dataIndex: "options",
    render: (options?: any[]) => options?.length ?? 0,
  },
];
