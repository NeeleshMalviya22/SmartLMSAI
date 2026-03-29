import { Form, Input, Switch, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import FormModal from "../common/FormModal";
import type { CreateCourseModalProps } from "../../types/modals";
import { useEffect } from "react";

export default function CreateCourseModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  isEdit = false,
}: CreateCourseModalProps) {
  console.log("Render 👉", initialValues);

  useEffect(() => {
    console.log("Updated 👉", initialValues);
  }, [initialValues]);
  
  return (
    <FormModal
      title={isEdit ? "Edit Course" : "Create Course"}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <div className="space-y-6">

        {/* Course Title */}
        <Form.Item
          label={
            <span className="text-sm font-medium">
              Course Title{" "}
              <Tooltip title="This title will be visible to learners">
                <InfoCircleOutlined className="text-gray-400 ml-1" />
              </Tooltip>
            </span>
          }
          name="title"
          rules={[{ required: true, message: "Please enter course title" }]}
        >
          <Input
            size="large"
            placeholder="Example: Introduction to React"
            className="h-12 rounded-md border-gray-300"
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label={
            <span className="text-sm font-medium">
              Description{" "}
              <Tooltip title="Optional short description about the course">
                <InfoCircleOutlined className="text-gray-400 ml-1" />
              </Tooltip>
            </span>
          }
          name="description"
        >
          <Input.TextArea
            rows={5}
            placeholder="Write a short description..."
            showCount
            maxLength={500}
            className="rounded-md border-gray-300 text-base"
          />
        </Form.Item>

        {/* Active Status */}
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
        >
          <div className="flex items-center gap-4 mt-2">
            <Switch />
            <span className="text-gray-500 text-sm">
              Course visible to learners
            </span>
          </div>
        </Form.Item>

      </div>
    </FormModal>
  );
}