import { Modal, Form } from "antd";
import { useEffect } from "react";
import type { FormModalProps } from "../../types/form-modal";

export default function FormModal<T extends object>({
  title,
  open,
  onClose,
  onSubmit,
  initialValues,
  width = 700,
  children,
}: FormModalProps<T>) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues, form]);

  const handleFinish = (values: T) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      width={width}
      centered
      destroyOnHidden={false}
      forceRender
      mask={{ closable: false }}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        {children}
      </Form>
    </Modal>
  );
}