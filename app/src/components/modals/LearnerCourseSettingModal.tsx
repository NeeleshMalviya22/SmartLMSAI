import { Modal, Form, Select, Button } from "antd";
import { useEffect, useState } from "react";

import { getAllCoursesApi } from "../../services/course/courseService";
import { getLearnerCoursesApi, setLearnerCoursesApi } from "../../services/learner/learnerService";

const { Option } = Select;

export default function LearnerCourseSettingModal({
  open,
  onClose,
  learnerId
}: any) {

  const [form] = Form.useForm();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      loadCourses();
      loadLearnerCourses();
    }
  }, [open]);

  const loadCourses = async () => {
    const res = await getAllCoursesApi();
    setCourses(res.data);
  };

  const loadLearnerCourses = async () => {

    if (!learnerId) return;

    const res = await getLearnerCoursesApi(learnerId);

    form.setFieldsValue({
      courses: res.map((x: any) => x.courseId)
    });
  };

  const handleSubmit = async (values: any) => {

    await setLearnerCoursesApi({
      learnerId,
      courseIds: values.courses
    });

    onClose();
  };

  return (
    <Modal
      title="Learner Course Settings"
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        <Form.Item
          label="Assign Courses"
          name="courses"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            placeholder="Select courses"
          >
            {courses.map((c: any) => (
              <Option key={c.id} value={c.id}>
                {c.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
        >
          Save
        </Button>

      </Form>
    </Modal>
  );
}