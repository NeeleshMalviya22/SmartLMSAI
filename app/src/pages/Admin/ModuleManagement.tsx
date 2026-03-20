import EntityManagement from "../../components/common/EntityManagement";
import CreateModuleModal from "../../components/modals/CreateModuleModal";
import { moduleColumns } from "../../config/tableColumns";
import type { Course } from "../../types/types";
import {
  getModulesApi,
  createModuleApi,
  updateModuleApi,
  deleteModuleApi,
} from "../../services/modules/moduleService";
import { getAllCoursesApi } from "../../services/course/courseService";
import { useEffect, useState } from "react";

export default function ModuleManagement() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    void loadCourses();
  }, []);

  async function loadCourses() {
    const res = await getAllCoursesApi();
    const courseItems = Array.isArray(res) ? res : (res as { data?: unknown[] }).data ?? [];
    setCourses(courseItems as unknown as Array<{ id: number; title: string }>);
  }

  return (
    <EntityManagement
      title="Module Management"
      columns={moduleColumns}
      fetchData={getModulesApi}
      createApi={createModuleApi}
      updateApi={updateModuleApi}
      deleteApi={deleteModuleApi}
      ModalComponent={CreateModuleModal}
      rowKey="moduleId"
      modalProps={{ courses }}
    />
  );
}