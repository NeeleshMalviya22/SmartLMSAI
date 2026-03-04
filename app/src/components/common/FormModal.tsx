import { Modal, Form } from "antd";
import { useEffect, type ReactNode } from "react";

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  width?: number;
  children: ReactNode;
}

export default function FormModal({
  title,
  open,
  onClose,
  onSubmit,
  initialValues,
  width = 700,
  children,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues, form]);

  const handleFinish = (values: any) => {
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
      destroyOnClose
      maskClosable={false}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        {children}
      </Form>
    </Modal>
  );
}