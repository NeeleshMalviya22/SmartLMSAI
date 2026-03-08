import { Form, Input, Switch} from "antd";
import FormModal from "../common/FormModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  isEdit?: boolean;
}

export default function CreateCourseModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  isEdit = false,
}: Props) {
  return (
    <FormModal
      title={isEdit ? "Edit Course" : "Create New Course"}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        label="Course Title"
        name="title"
        rules={[{ required: true, message: "Please enter course title" }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Active Status"
        name="isActive"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch />
      </Form.Item>

      {/* <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          {isEdit ? "Update Course" : "Create Course"}
        </Button>
      </Space> */}
    </FormModal>
  );
}