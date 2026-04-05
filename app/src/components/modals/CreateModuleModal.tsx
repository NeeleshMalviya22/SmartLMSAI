import { Modal, Form, Input, InputNumber, Select, Upload, Button, Tooltip, Switch } from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
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

        <Form.Item
          label={
            <span className="text-sm font-medium">
              Active Status{" "}
              <Tooltip title="Enable or disable this course for learners">
                <InfoCircleOutlined className="text-gray-400 ml-1" />
              </Tooltip>
            </span>
          }
          name="isActive"
          valuePropName="checked"
          initialValue={true}
        >
          <div className="flex items-center gap-4 mt-2">
            <Switch />
            <span className="text-gray-500 text-sm">
              Module visible to learners
            </span>
          </div>
        </Form.Item>


      </Form>
    </Modal>
  );
}