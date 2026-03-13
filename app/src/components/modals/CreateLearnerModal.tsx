import { Form, Select, Switch, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import FormModal from "../common/FormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  courses?: any[];
}

export default function CreateLearnerModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  courses = []
}: Props) {

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
            options={courses.map((c: any) => ({
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