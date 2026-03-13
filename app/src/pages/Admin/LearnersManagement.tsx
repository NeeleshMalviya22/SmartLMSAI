import { useEffect, useState } from "react";

import EntityManagement from "../../components/common/EntityManagement";
import StatusTag from "../../components/common/StatusTag";
import CreateLearnerModal from "../../components/modals/CreateLearnerModal";

import { createLearnerApi, getLearnersApi } from "../../services/learner/learnerService";
import { getAllCoursesApi } from "../../services/course/courseService";

const columns = [
  { title: "Name", dataIndex: "name", sorter: true },
  { title: "Email", dataIndex: "email", sorter: true },
  { title: "Courses", dataIndex: "courseTitle", sorter: true },
  { title: "Created Date", dataIndex: "createdOn" },
  {
    title: "Status",
    dataIndex: "isActive",
    render: (val: boolean) => <StatusTag active={val} />
  }
];

export default function LearnerManagement() {

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const res = await getAllCoursesApi();
      setCourses(res.data);
    } catch {
      console.log("Failed to load modules");
    }
  };

  return (
   <EntityManagement
      title="Learner Management"
      columns={columns}
      fetchData={getLearnersApi}
      updateApi={createLearnerApi}
      ModalComponent={CreateLearnerModal}
      rowKey="id"
      modalProps={{ courses }}
      hideCreateButton={true}
      useSettingsAction={true}
/>
  );
}