import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Card,
  Typography,
  Tag,
} from "antd";

import {
  createModuleApi,
  deleteModuleApi,
  updateModuleApi,
  getModulesApi,
} from "../../services/modules/moduleService";

import { getAllCoursesApi } from "../../services/course/courseService";
import CreateModuleModal from "../../components/modals/CreateModuleModal";
import AppSearch from "../../components/common/AppSearch";

const { Title } = Typography;

interface Module {
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  isActive: boolean;
}

export default function ModuleManagement() {
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [searchText, setSearchText] = useState("");

  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    sortBy: "",
    sortOrder: "",
  });

  // ✅ Load courses dropdown
  const loadCourses = async () => {
    const res = await getAllCoursesApi();
    setCourses(res.data);
  };

  // ✅ Load modules (LIKE COURSE PAGE)
  const loadModules = async (extra: any = {}) => {
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

      const res = await getModulesApi(params);

      setModules(res.items);
      setTableParams(prev => ({
        ...prev,
        total: res.totalCount,
      }));

    } catch {
      message.error("Failed to load modules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // reload when params change
  useEffect(() => {
    loadModules();
  }, [
    searchText,
    tableParams.page,
    tableParams.pageSize,
    tableParams.sortBy,
    tableParams.sortOrder,
  ]);

  // sorting & pagination handler
  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    const field = Array.isArray(sorter) ? sorter[0]?.field : sorter?.field;
    const order = Array.isArray(sorter) ? sorter[0]?.order : sorter?.order;

    setTableParams(prev => ({
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
      if (editingModule) {
        await updateModuleApi(editingModule.moduleId, values);
        message.success("Module updated successfully.");
      } else {
        await createModuleApi(values);
        message.success("Module created successfully.");
      }

      setOpenModal(false);
      setEditingModule(null);
      loadModules();
    } catch {
      message.error("Unable to save module.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteModuleApi(id);
      message.success("Module deleted successfully.");
      loadModules();
    } catch {
      message.error("Unable to delete module.");
    }
  };

  const columns = [{
      title: "Order",
      dataIndex: "orderIndex",
      key: "orderIndex",
      sorter: true,
      width: 90,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "CourseName",
      dataIndex: "courseName",
      key: "courseName",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Module) =>
        record.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Module) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingModule(record);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete module?"
            onConfirm={() => handleDelete(record.moduleId)}
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
      <Title level={3}>Module Management</Title>

      <div className="flex justify-between items-center mb-4">
        <AppSearch
          placeholder="Search modules..."
          onSearch={(val) => {
            setSearchText(val);
            setTableParams(prev => ({ ...prev, page: 1 }));
          }}
        />

        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditingModule(null);
            setOpenModal(true);
          }}
        >
          + Add Module
        </Button>
      </div>

      <Card>
        <Table
          rowKey="moduleId"
          columns={columns}
          dataSource={modules}
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

      <CreateModuleModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingModule(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editingModule}
        courses={courses}
      />
    </div>
  );
}