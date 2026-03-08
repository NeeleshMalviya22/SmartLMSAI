import EntityManagement from "../../components/common/EntityManagement";
import CreateCourseModal from "../../components/modals/CreateCourseModal";
import {getCoursesApi, createCourseApi, updateCourseApi, deleteCourseApi} from "../../services/course/courseService";

const columns = [
  {
    title: "Course",
    dataIndex: "title",
    sorter: true,
  },
  {
    title: "Modules",
    dataIndex: "moduleCount",
    sorter: true,
  },
  {
    title: "Learners",
    dataIndex: "learnerCount",
    sorter: true,
  },
  {
    title: "Created Date",
    dataIndex: "createdOn",
    sorter: true,
  },
];

export default function CourseManagement() {
  return (
    <EntityManagement
      title="Course Management"
      columns={columns}
      fetchData={getCoursesApi}
      createApi={createCourseApi}
      updateApi={updateCourseApi}
      deleteApi={deleteCourseApi}
      ModalComponent={CreateCourseModal}
      rowKey="id"
    />
  );
}