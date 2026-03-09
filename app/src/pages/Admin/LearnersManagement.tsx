import EntityManagement from "../../components/common/EntityManagement";


import { useState } from "react";
import { Button } from "antd";
import { getLearnersApi } from "../../services/learner/learnerService";
import LearnerCourseSettingModal from "../../components/modals/LearnerCourseSettingModal";

export default function LearnerManagement() {

  const [openSettings, setOpenSettings] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState("");

  const openModal = (learnerId: string) => {
    setSelectedLearner(learnerId);
    setOpenSettings(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Courses",
      dataIndex: "courseCount"
    },
    {
      title: "Settings",
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => openModal(record.id)}
        >
          Settings
        </Button>
      )
    }
  ];

  return (
    <>
      <EntityManagement
        title="Learner Management"
        columns={columns}
        fetchData={getLearnersApi}
        rowKey="id"
      />

      <LearnerCourseSettingModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        learnerId={selectedLearner}
      />
    </>
  );
}