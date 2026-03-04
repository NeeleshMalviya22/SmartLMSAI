import { useState, useEffect } from "react";
import { Table, Card, Typography, Tag, message } from "antd";

import AppSearch from "../../components/common/AppSearch";
import { getLearnersApi } from "../../services/learner/learnerService";

const { Title } = Typography;

interface Learner {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  isActive: boolean;
}

export default function LearnersManagement() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    sortBy: "",
    sortOrder: "",
  });

  // Load learners
  const loadLearners = async (extra: any = {}) => {
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

      const res = await getLearnersApi(params);

      setLearners(res.items);

      setTableParams((prev) => ({
        ...prev,
        total: res.totalCount,
      }));
    } catch {
      message.error("Failed to load learners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLearners();
  }, [
    searchText,
    tableParams.page,
    tableParams.pageSize,
    tableParams.sortBy,
    tableParams.sortOrder,
  ]);

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

  const columns = [
    {
      title: "Learner Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ellipsis: { showTitle: true },
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Courses",
      dataIndex: "enrolledCourses",
      key: "enrolledCourses",
      sorter: true,
      render: (val: number) => val ?? 0,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Learner) =>
        record.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={3} style={{ marginBottom: 12 }}>
        Learners Management
      </Title>

      <div className="flex justify-between items-center mb-4">
        <AppSearch
          placeholder="Search learners..."
          onSearch={(val) => {
            setSearchText(val);
            setTableParams((prev) => ({ ...prev, page: 1 }));
          }}
        />
      </div>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={learners}
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
    </div>
  );
}