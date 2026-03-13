import { useState, useEffect } from "react";
import { Table, Button, Card, Typography, Space, message } from "antd";
import AppSearch from "./AppSearch";

import {
  defaultTableParams,
  handleAntTableChange,
} from "../../utils/tableUtils";
import DeleteButton from "./DeleteButton";
import { SettingOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function EntityManagement({
  title,
  columns,
  fetchData,
  createApi,
  updateApi,
  deleteApi,
  ModalComponent,
  rowKey = "id",
  modalProps = {},
  expandable,
  hideCreateButton = false,
  useSettingsAction = false
}: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchText, setSearchText] = useState("");

  const [tableParams, setTableParams] = useState(defaultTableParams);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await fetchData({
        search: searchText,
        page: tableParams.page,
        pageSize: tableParams.pageSize,
        sortBy: tableParams.sortBy,
        sortOrder: tableParams.sortOrder,
      });

      setData(res.items);

      setTableParams((prev: any) => ({
        ...prev,
        total: res.totalCount,
      }));
    } catch {
      message.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [
    searchText,
    tableParams.page,
    tableParams.pageSize,
    tableParams.sortBy,
    tableParams.sortOrder,
  ]);

  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    handleAntTableChange(pagination, sorter, setTableParams);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (useSettingsAction) {
        console.log(editingItem);
         console.log(values);
        await updateApi({
          learnerId: editingItem.learnerId,
          ...values
        });
        message.success("Saved successfully.");
      }
      else if (editingItem) {
        await updateApi(editingItem[rowKey], values);
        message.success("Updated successfully.");
      }
      else {
        await createApi(values);
        message.success("Created successfully.");
      }

    setOpenModal(false);
    setEditingItem(null);
    loadData();

      setOpenModal(false);
      setEditingItem(null);
      loadData();
    } catch {
      message.error("Save failed.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteApi(id);
      message.success("Deleted successfully.");
      loadData();
    } catch {
      message.error("Delete failed.");
    }
  };

const enhancedColumns = [
  ...columns,
  {
    title: useSettingsAction ? "Settings" : "Actions",
    render: (_: any, record: any) => (
      useSettingsAction ? (
        <Button
          icon={<SettingOutlined />}
          onClick={() => {
            setEditingItem(record);
            setOpenModal(true);
          }}
        />
      ) : (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingItem(record);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>

          <DeleteButton
            onConfirm={() => handleDelete(record[rowKey])}
          />
        </Space>
      )
    ),
  },
];

  return (
    <div className="p-6">
      <Title level={3}>{title}</Title>

      <div className="flex justify-between items-center mb-4">
        <AppSearch
          placeholder={`Search ${title}`}
          onSearch={(val) => {
            setSearchText(val);
            setTableParams((prev: any) => ({ ...prev, page: 1 }));
          }}
        />

      {!hideCreateButton && (
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setEditingItem(null);
            setOpenModal(true);
          }}
        >
          + Create
        </Button>
      )}
      </div>

      <Card>
        <Table
          rowKey={rowKey}
          columns={enhancedColumns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: tableParams.page,
            pageSize: tableParams.pageSize,
            total: tableParams.total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
          expandable={expandable}
        />
      </Card>

      <ModalComponent
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editingItem}
        isEdit={!!editingItem}
        {...modalProps}
      />
    </div>
  );
}