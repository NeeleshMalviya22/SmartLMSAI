import { useEffect, useState } from "react";
import EntityManagement from "../../components/common/EntityManagement";
import CreateLearnerModal from "../../components/modals/CreateLearnerModal";
import { learnerColumns } from "../../config/tableColumns";
import type { Course } from "../../types/types";
import { getLearnersApi, updateLearnerApi } from "../../services/learner/learnerService";
import { getAllCoursesApi } from "../../services/course/courseService";

export default function LearnerManagement() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    void loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await getAllCoursesApi();
      const courseItems = Array.isArray(res)
        ? res
        : (res as { data?: Course[] })?.data ?? [];
      setCourses(courseItems as Course[]);
    } catch {
      console.log("Failed to load courses");
    }
  }

  return (
    <EntityManagement
      title="Learner Management"
      columns={learnerColumns}
      fetchData={getLearnersApi}
      updateApi={updateLearnerApi}
      ModalComponent={CreateLearnerModal}
      rowKey="id"
      modalProps={{ courses }}
      hideCreateButton={true}
      useSettingsAction={true}
    />
  );
}