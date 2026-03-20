import { Form, Select, Switch, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import FormModal from "../common/FormModal";
import type { CreateLearnerModalProps } from "../../types/modals";
import type { Course } from "../../types/types";

export default function CreateLearnerModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  courses = []
}: CreateLearnerModalProps) {

  return (
    <FormModal
      title="Course Assign"
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >

      <div className="space-y-6">

        {/* Module Dropdown */}
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

        {/* Active Status */}
        <Form.Item
          label={
            <span className="text-sm font-medium">
              Active Status
              <Tooltip title="Enable or disable learner">
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
              Learner can access courses
            </span>
          </div>
        </Form.Item>

      </div>

    </FormModal>
  );
}