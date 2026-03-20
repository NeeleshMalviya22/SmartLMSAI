import { Modal, Form, Input, InputNumber, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Course } from "../../types/types";
import type { CreateModuleModalProps } from "../../types/modals";

interface CreateModuleValues {
  courseId: number;
  title: string;
  description?: string;
  order: number;
  documents?: File[];
}

export default function CreateModuleModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  courses,
}: CreateModuleModalProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: CreateModuleValues) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit Module" : "Create Module"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={initialValues}>
        
        {/* Course */}
        <Form.Item
          name="courseId"
          label="Course"
          rules={[{ required: true, message: "Select course" }]}
        >
          <Select
            showSearch
            placeholder="Select course"
            options={courses.map((c: Course) => ({
              value: c.id,
              label: c.title,
            }))}
          />
        </Form.Item>

        {/* Title */}
        <Form.Item
          name="title"
          label="Module Title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        {/* Order */}
        <Form.Item
          name="order"
          label="Order"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        {/* 📄 Upload Documents */}
        <Form.Item
          name="documents"
          label="Upload Documents"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload multiple beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Form.Item>

      </Form>
    </Modal>
  );
}