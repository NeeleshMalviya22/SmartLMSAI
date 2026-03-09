import EntityManagement from "../../components/common/EntityManagement";
import CreateModuleModal from "../../components/modals/CreateModuleModal";

import {
  getModulesApi,
  createModuleApi,
  updateModuleApi,
  deleteModuleApi,
} from "../../services/modules/moduleService";

import { getAllCoursesApi } from "../../services/course/courseService";
import { useEffect, useState } from "react";

const columns = [
  { title: "Title", dataIndex: "title", sorter: true},
  {title: "Course", dataIndex: "courseName", sorter: true},
  {title: "Description",  dataIndex: "description" },
  {title: "Created on",  dataIndex: "createdOn" },

];

export default function ModuleManagement() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await getAllCoursesApi();
    setCourses(res.data);
  };

  return (
    <EntityManagement
      title="Module Management"
      columns={columns}
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