import { Modal, Form, Input, Switch, Button, Space } from "antd";
import React, { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  isEdit?: boolean;
}

const CreateCourseModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  isEdit = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues]);

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={isEdit ? "Edit Course" : "Create New Course"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      destroyOnHidden
      maskClosable={false}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
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

        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update Course" : "Create Course"}
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default CreateCourseModal;