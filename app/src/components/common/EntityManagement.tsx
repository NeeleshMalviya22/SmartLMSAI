import React, { useState, useEffect } from "react";
import { Table, Button, Card, Typography, Space, message } from "antd";
import DeleteButton from "./DeleteButton";
import AppSearch from "./AppSearch";
import { SettingOutlined } from "@ant-design/icons";
import { defaultTableParams, handleAntTableChange } from "../../utils/tableUtils";
import type { TablePaginationConfig, SorterResult, ColumnsType, FilterValue, TableCurrentDataSource } from "antd/es/table/interface";
import type { EntityManagementProps } from "../../types/entity-management";

const { Title } = Typography;

export default function EntityManagement<T extends object, E extends object>({
  title,
  columns,
  fetchData,
  createApi,
  updateApi,
  deleteApi,
  ModalComponent,
  rowKey = "id",
  modalProps = {} as E,
  expandable,
  hideCreateButton = false,
  useSettingsAction = false,
}: EntityManagementProps<T, E>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [searchText, setSearchText] = useState("");

  const [tableParams, setTableParams] = useState(defaultTableParams);

  const loadData = React.useCallback(async () => {
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

      setTableParams((prev) => ({
        ...prev,
        total: res.totalCount,
      }));
    } catch {
      message.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [
    fetchData,
    searchText,
    tableParams.page,
    tableParams.pageSize,
    tableParams.sortBy,
    tableParams.sortOrder,
  ]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    _extra: TableCurrentDataSource<T>
  ) => {
    handleAntTableChange(pagination, sorter, setTableParams);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (useSettingsAction && updateApi && editingItem) {
        await updateApi(String((editingItem as any)[rowKey]), values);
        message.success("Saved successfully.");
      } else if (editingItem && updateApi) {
        await updateApi(String((editingItem as any)[rowKey]), values);
        message.success("Updated successfully.");
      } else if (createApi) {
        await createApi(values);
        message.success("Created successfully.");
      }

      setOpenModal(false);
      setEditingItem(null);
      void loadData();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Save failed.";
      message.error(errorMsg);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      if (deleteApi) {
        await deleteApi(String(id));
        message.success("Deleted successfully.");
        void loadData();
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Delete failed.";
      message.error(errorMsg);
    }
  };

  const enhancedColumns: ColumnsType<T> = [
    ...columns,
    {
      title: useSettingsAction ? "Settings" : "Actions",
      render: (_: unknown, record: T) =>
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
              onConfirm={() =>
                handleDelete(String((record as any)[rowKey]))
              }
            />
          </Space>
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
            setTableParams((prev) => ({ ...prev, page: 1 }));
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
        initialValues={editingItem || undefined}
        isEdit={!!editingItem}
        {...modalProps}
      />
    </div>
  );
}