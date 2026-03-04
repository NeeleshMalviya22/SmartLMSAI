import { Form, Input, Select, InputNumber, Switch } from "antd";
import FormModal from "../common/FormModal";

export default function CreateQuizModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  isEdit,
  modules,
}: any) {
  return (
    <FormModal
      title={isEdit ? "Edit Quiz" : "Create Quiz"}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="title"
        label="Quiz Title"
        rules={[{ required: true, message: "Quiz title is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="moduleId"
        label="Module"
        rules={[{ required: true, message: "Please select module" }]}
      >
        <Select
          showSearch
          placeholder="Select Module"
          optionFilterProp="label"
          options={modules?.map((m: any) => ({
            label: m.title,
            value: m.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="passingScore"
        label="Passing Score"
        rules={[{ required: true, message: "Passing score is required" }]}
      >
        <InputNumber min={0} max={100} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="isActive"
        label="Active"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </FormModal>
  );
}