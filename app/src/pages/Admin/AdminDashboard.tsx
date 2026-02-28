import {Card, Col, Row,
  Progress,
  Table,
  Typography,
  Space,
} from "antd";
import {
  BookOutlined,
  UserOutlined,
  RiseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function AdminDashboard() {

  const stats = [
    { title: "Total Courses", value: 12, icon: <BookOutlined /> },
    { title: "Active Learners", value: 148, icon: <UserOutlined /> },
    { title: "Avg Completion", value: "67%", icon: <RiseOutlined /> },
    { title: "Avg Quiz Score", value: "79%", icon: <BarChartOutlined /> },
  ];

  const courses = [
    { name: "ISO 9001 Quality Management", progress: 82 },
    { name: "Workplace Safety & Compliance", progress: 65 },
    { name: "Project Management Fundamentals", progress: 48 },
    { name: "Customer Service Excellence", progress: 71 },
    { name: "Cybersecurity Awareness", progress: 55 },
  ];

  const learners = [
    { key: 1, name: "Sarah Roberts", course: "ISO 9001", progress: 82, status: "Completed" },
    { key: 2, name: "James Walker", course: "Safety", progress: 60, status: "In Progress" },
    { key: 3, name: "Maria Lopez", course: "Cybersecurity", progress: 40, status: "Pending" },
  ];

  const columns = [
    { title: "Learner", dataIndex: "name" },
    { title: "Course", dataIndex: "course" },
    {
      title: "Progress",
      dataIndex: "progress",
      render: (value: number) => <Progress percent={value} size="small" />,
    },
    { title: "Status", dataIndex: "status" },
  ];

  return (
    <div style={{ padding: 24 }}>

      {/* Header */}
      <Title level={3}>Good morning, James 👋</Title>
      <Text type="secondary">
        Here's what's happening with your courses today.
      </Text>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {stats.map((item, i) => (
          <Col xs={24} sm={12} md={6} key={i}>
            <Card>
              <Space direction="vertical">
                <Text type="secondary">{item.title}</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {item.value}
                </Title>
                <div style={{ fontSize: 22, color: "#1677ff" }}>
                  {item.icon}
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>

        {/* LEFT SIDE */}
        <Col xs={24} lg={16}>
          
          {/* Course Progress */}
          <Card title="Course Progress" style={{ marginBottom: 16 }}>
            {courses.map((c, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text>{c.name}</Text>
                  <Text>{c.progress}%</Text>
                </Space>
                <Progress percent={c.progress} showInfo={false} />
              </div>
            ))}
          </Card>

          {/* Learner Activity */}
          <Card title="Recent Learner Activity">
            <Table
              dataSource={learners}
              columns={columns}
              pagination={false}
            />
          </Card>

        </Col>

        {/* RIGHT SIDE */}
        <Col xs={24} lg={8}>

          {/* Module Quiz Scores */}
          <Card title="Module Quiz Scores" style={{ marginBottom: 16 }}>
            {["M1", "M2", "M3", "M4", "M5", "M6"].map((m, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <Text>{m}</Text>
                <Progress percent={70} size="small" />
              </div>
            ))}
          </Card>

          {/* Completion Rates */}
          <Card title="Completion Rates">
            <Space size="large">
              {[82, 65, 70].map((val, i) => (
                <Progress
                  key={i}
                  type="circle"
                  percent={val}
                  width={80}
                />
              ))}
            </Space>
          </Card>

        </Col>

      </Row>
    </div>
  );
}
