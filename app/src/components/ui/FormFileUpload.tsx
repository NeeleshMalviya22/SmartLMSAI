import { Form, Upload, Button, Tooltip } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";

interface FormFileUploadProps {
  name: string;
  label: string;
  required?: boolean;
  tooltip?: string;
  accept?: string;
  multiple?: boolean;
  buttonText?: string;
}

export default function FormFileUpload({
  name,
  label,
  required = false,
  tooltip,
  accept = ".pdf",
  multiple = false,
  buttonText = "Upload File",
}: FormFileUploadProps) {
  return (
    <Form.Item
      label={
        <span className="text-sm font-medium">
          {label}{" "}
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="text-gray-400 ml-1" />
            </Tooltip>
          )}
        </span>
      }
      name={name}
      valuePropName="fileList"
      rules={required ? [{ required: true, message: `Please upload ${label.toLowerCase()}` }] : undefined}
    >
      <Upload
        beforeUpload={() => false}
        maxCount={multiple ? undefined : 1}
        accept={accept}
      >
        <Button icon={<UploadOutlined />}>{buttonText}</Button>
      </Upload>
    </Form.Item>
  );
}
