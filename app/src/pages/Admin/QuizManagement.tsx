import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Typography,
  Space,
  Popconfirm,
  message,
  Tag,
} from "antd";

import AppSearch from "../../components/common/AppSearch";
import CreateQuizModal from "../../components/modals/CreateQuizModal";
import {
  createQuizApi,
  deleteQuizApi,
  getQuizzesApi,
  updateQuizApi,
} from "../../services/quiz/quizService";
import { getAllModuleApi } from "../../services/modules/moduleService";

const { Title } = Typography;

interface Quiz {
  quizId: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  description?: string;
  passingScore: number;
  isActive: boolean;
}

export default function QuizManagement() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [searchText, setSearchText] = useState("");
  const [modules, setModules] = useState<any[]>([]);

  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    sortBy: "",
    sortOrder: "",
  });

  // Load quizzes
  const loadQuizzes = async () => {
    try {
      setLoading(true);

      const res = await getQuizzesApi({
        search: searchText,
        page: tableParams.page,
        pageSize: tableParams.pageSize,
        sortBy: tableParams.sortBy,
        sortOrder: tableParams.sortOrder,
      });

      setQuizzes(res.items);
      setTableParams((prev) => ({
        ...prev,
        total: res.totalCount,
      }));
    } catch {
      message.error("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  // Load modules for dropdown
  const loadModules = async () => {
    const res = await getAllModuleApi();
    setModules(res.data);
  };

  useEffect(() => {
    loadModules();
    loadQuizzes();
  }, [
    searchText,
    tableParams.page,
    tableParams.pageSize,
    tableParams.sortBy,
    tableParams.sortOrder,
  ]);

  // Sorting & Pagination
  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    const field = Array.isArray(sorter) ? sorter[0]?.field : sorter?.field;
    const order = Array.isArray(sorter) ? sorter[0]?.order : sorter?.order;

    setTableParams((prev) => ({
      ...prev,
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortBy: field || "",
      sortOrder:
        order === "ascend"
          ? "asc"
          : order === "descend"
          ? "desc"
          : "",
    }));
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingQuiz) {
        await updateQuizApi(editingQuiz.quizId, values);
        message.success("Quiz updated successfully.");
      } else {
        await createQuizApi(values);
        message.success("Quiz created successfully.");
      }

      setOpenModal(false);
      setEditingQuiz(null);
      loadQuizzes();
    } catch {
      message.error("Unable to save quiz.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuizApi(id);
      message.success("Quiz deleted successfully.");
      loadQuizzes();
    } catch {
      message.error("Unable to delete quiz.");
    }
  };

  const columns = [
    {
      title: "Quiz Title",
      dataIndex: "title",
      sorter: true,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Module",
      dataIndex: "moduleTitle",
      sorter: true,
    },
    {
      title: "Passing Score",
      dataIndex: "passingScore",
      sorter: true,
      render: (val: number) => `${val}%`,
    },
    {
      title: "Status",
      render: (_: any, record: Quiz) =>
        record.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_: any, record: Quiz) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingQuiz(record);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete quiz?"
            onConfirm={() => handleDelete(record.quizId)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={3}>Quiz Management</Title>

      <div className="flex justify-between items-center mb-4">
        <AppSearch
          placeholder="Search quizzes..."
          onSearch={(val) => {
            setSearchText(val);
            setTableParams((prev) => ({ ...prev, page: 1 }));
          }}
        />

        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditingQuiz(null);
            setOpenModal(true);
          }}
        >
          + Create Quiz
        </Button>
      </div>

      <Card>
        <Table
          rowKey="quizId"
          columns={columns}
          dataSource={quizzes}
          loading={loading}
          pagination={{
            current: tableParams.page,
            pageSize: tableParams.pageSize,
            total: tableParams.total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        />
      </Card>

      <CreateQuizModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingQuiz(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editingQuiz}
        isEdit={!!editingQuiz}
        modules={modules}
      />
    </div>
  );
}