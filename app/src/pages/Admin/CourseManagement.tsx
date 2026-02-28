import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Typography,
  Space,
  Tag,
  Popconfirm,
  message,
} from "antd";

import CreateCourseModal from "../../components/modals/CreateCourseModal";
import AppSearch from "../../components/common/AppSearch";

import {
  createCourseApi,
  deleteCourseApi,
  getCoursesApi,
  updateCourseApi,
} from "../../services/course/courseService";

const { Title } = Typography;

interface Course {
  id: string;
  title: string;
  modules: number;
  learners: number;
  isActive: boolean;
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchText, setSearchText] = useState("");

  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    sortBy: "",
    sortOrder: "",
  });

  // ✅ Load data
  const loadCourses = async (extra: any = {}) => {
    try {
      setLoading(true);

      const params = {
        search: searchText,
        page: tableParams.page,
        pageSize: tableParams.pageSize,
        sortBy: tableParams.sortBy,
        sortOrder: tableParams.sortOrder,
        ...extra,
      };

      const res = await getCoursesApi(params);

      setCourses(res.items);
      setTableParams((prev) => ({
        ...prev,
        total: res.totalCount,
      }));
    } catch {
      message.error("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ reload when params change
  useEffect(() => {
    loadCourses();
  }, [
    searchText,
    tableParams.page,
    tableParams.pageSize,
    tableParams.sortBy,      // ⭐ required
    tableParams.sortOrder,   // ⭐ required
  ]);

  // ✅ sorting & pagination handler
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
      if (editingCourse) {
        await updateCourseApi(editingCourse.id, values);
        message.success("Course updated successfully.");
      } else {
        await createCourseApi(values);
        message.success("Course created successfully.");
      }

      setOpenModal(false);
      setEditingCourse(null);
      loadCourses();
    } catch {
      message.error("Unable to save course.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourseApi(id);
      message.success("Course deleted successfully.");
      loadCourses();
    } catch {
      message.error("Unable to delete course.");
    }
  };

  const columns = [
    {
      title: "Course",
      dataIndex: "title",
      key: "title",     
      sorter: true,
      ellipsis: { showTitle: true },
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Modules",
      dataIndex: "modules",
      key: "modules",   
      sorter: true,
      render: (val: number) => val ?? 0,
    },
    {
      title: "Learners",
      dataIndex: "learners",
      key: "learners",  
      sorter: true,
      render: (val: number) => val ?? 0,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Course) =>
        record.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Course) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingCourse(record);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete course?"
            onConfirm={() => handleDelete(record.id)}
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
      <Title level={3} style={{ marginBottom: 12 }}>
        Course Management
      </Title>
      <div className="flex justify-between items-center mb-4">
        <AppSearch
          placeholder="Search courses..."
          onSearch={(val) => {
            setSearchText(val);
            setTableParams((prev) => ({ ...prev, page: 1 }));
          }}
        />

        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditingCourse(null);
            setOpenModal(true);
          }}
        >
          + Create Course
        </Button>
      </div>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={courses}
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

      <CreateCourseModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingCourse(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editingCourse}
        isEdit={!!editingCourse}
      />
    </div>
  );
}