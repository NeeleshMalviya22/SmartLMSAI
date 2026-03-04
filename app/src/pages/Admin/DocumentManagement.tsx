import { useState } from "react";
import { Table, Card, Typography, Tag } from "antd";
import AppSearch from "../../components/common/AppSearch";

const { Title } = Typography;

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  status: boolean;
}

const dummyDocuments: DocumentItem[] = [
  {
    id: "1",
    name: "React Basics.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Admin",
    status: true,
  },
  {
    id: "2",
    name: "Angular Guide.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadedBy: "Trainer",
    status: true,
  },
  {
    id: "3",
    name: "NodeJS Notes.pdf",
    type: "PDF",
    size: "3.2 MB",
    uploadedBy: "Admin",
    status: false,
  },
  {
    id: "4",
    name: "System Design.pptx",
    type: "PPTX",
    size: "5.1 MB",
    uploadedBy: "Trainer",
    status: true,
  },
];

export default function DocumentManagement() {
  const [documents] = useState<DocumentItem[]>(dummyDocuments);
  const [searchText, setSearchText] = useState("");

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Document Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: DocumentItem, b: DocumentItem) =>
        a.name.localeCompare(b.name),
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a: DocumentItem, b: DocumentItem) =>
        a.type.localeCompare(b.type),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Uploaded By",
      dataIndex: "uploadedBy",
      key: "uploadedBy",
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: DocumentItem) =>
        record.status ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={3} style={{ marginBottom: 12 }}>
        Document Management
      </Title>

      <div className="flex justify-between items-center mb-4">
        <AppSearch
          placeholder="Search documents..."
          onSearch={(val) => setSearchText(val)}
        />
      </div>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredDocs}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
          }}
        />
      </Card>
    </div>
  );
}