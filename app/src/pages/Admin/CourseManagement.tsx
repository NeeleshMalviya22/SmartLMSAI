import { Tag } from "antd";
import EntityManagement from "../../components/common/EntityManagement";
import StatusTag from "../../components/common/StatusTag";
import CreateCourseModal from "../../components/modals/CreateCourseModal";
import {getCoursesApi, createCourseApi, updateCourseApi, deleteCourseApi} from "../../services/course/courseService";
import { Ellipsis } from "lucide-react";

const columns = [
  {title: "Course", dataIndex: "title", sorter: true},
  {title: "Modules", dataIndex: "moduleCount",sorter: true},
  {title: "Modules", dataIndex: "moduleNames",sorter: true, Ellipsis, 
  render: (modules?: string) => (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {modules
        ?.split(",")
        .map((m: string) => m.trim())
        .map((m) => (
          <Tag key={m} color="geekblue">
            {m}
          </Tag>
        ))}
    </div>
  ),
},
  {title: "Learners", dataIndex: "learnerCount", sorter: true},
  {title: "Created Date", dataIndex: "createdOn"},
  {title: "Status", dataIndex: "isActive", render: (val: boolean) => <StatusTag active={val} />}
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