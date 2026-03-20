import EntityManagement from "../../components/common/EntityManagement";
import CreateCourseModal from "../../components/modals/CreateCourseModal";
import { courseColumns } from "../../config/tableColumns";
import {
  getCoursesApi,
  createCourseApi,
  updateCourseApi,
  deleteCourseApi,
} from "../../services/course/courseService";

export default function CourseManagement() {
  return (
    <EntityManagement
      title="Course Management"
      columns={courseColumns}
      fetchData={getCoursesApi}
      createApi={createCourseApi}
      updateApi={updateCourseApi}
      deleteApi={deleteCourseApi}
      ModalComponent={CreateCourseModal}
      rowKey="id"
    />
  );
}