import { Form, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FormModal from "../common/FormModal";

export default function CreateDocumentModal({
  open,
  onClose,
  onSubmit,
  modules
}: any) {
  return (
    <FormModal
      title="Upload Document"
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Form.Item
        name="moduleId"
        label="Module"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select Module"
          options={modules?.map((m: any) => ({
            label: m.title,
            value: m.id
          }))}
        />
      </Form.Item>

      <Form.Item
        name="file"
        label="PDF File"
        valuePropName="file"
        rules={[{ required: true }]}
      >
        <Upload
          beforeUpload={() => false}
          maxCount={1}
          accept=".pdf"
        >
          <div className="border border-dashed rounded-lg p-6 text-center cursor-pointer">
            <UploadOutlined />
            <p>Upload PDF</p>
          </div>
        </Upload>
      </Form.Item>
    </FormModal>
  );
}