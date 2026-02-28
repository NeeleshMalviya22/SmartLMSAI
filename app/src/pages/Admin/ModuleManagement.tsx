import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Card, Typography } from "antd";

import {
  createModuleApi,
  deleteModuleApi,
  updateModuleApi,
} from "../../services/modules/moduleService";

import { getAllCoursesApi } from "../../services/course/courseService";
import CreateModuleModal from "../../components/modals/CreateModuleModal";
import AppSearch from "../../components/common/AppSearch";

const { Title } = Typography;

export default function ModuleManagement() {
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [filteredModules, setFilteredModules] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  // load courses
  const loadCourses = async () => {
    const data = await getAllCoursesApi();
    setCourses(data.data);
  };



  useEffect(() => {
    loadCourses();
  }, []);

  // search filter
  const handleSearch = (value: string) => {
    const filtered = modules.filter((m) =>
      m.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredModules(filtered);
  };

  const handleSubmit = async (values: any) => {
    if (editing) {
      await updateModuleApi(editing.id, values);
      message.success("Module updated");
    } else {
      await createModuleApi(values);
      message.success("Module created");
    }

    setOpen(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await deleteModuleApi(id);
    message.success("Module deleted");
  };

  const columns = [
    { title: "Order", dataIndex: "order" },
    { title: "Title", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditing(record);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm title="Delete module?" onConfirm={() => handleDelete(record.id)}>
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* PAGE TITLE */}
      <Title level={3}>Module Management</Title>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-4">
        <AppSearch
          placeholder="Search modules..."
          onSearch={handleSearch}
        />

        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          + Add Module
        </Button>
      </div>

      {/* TABLE CARD */}
      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredModules}
          locale={{ emptyText: "No modules found" }}
        />
      </Card>

      <CreateModuleModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editing}
        courses={courses}
      />
    </div>
  );
}