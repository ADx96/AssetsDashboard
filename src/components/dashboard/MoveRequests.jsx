import { Table, Button, Popconfirm, Space, message } from "antd";
import qs from "qs";
import React, { useState } from "react";
import {
  useGetAssetQuery,
  useUpdateAssetMutation,
} from "../../Redux/Api/AssetsApi";
import {
  useGetMoveRequestsQuery,
  useUpdateMoveRequestMutation,
  useDeleteMoveRequestMutation,
} from "../../Redux/Api/RequestApi";

const query = qs.stringify({
  populate: "employee",
});

const MoveRequests = () => {
  const { success } = message;
  const [serial, setSerial] = useState("");
  const { data, isLoading } = useGetMoveRequestsQuery(query);
  const [updateMoveRequest] = useUpdateMoveRequestMutation();
  const [deleteMoveRequest] = useDeleteMoveRequestMutation();

  const [updateAsset] = useUpdateAssetMutation();

  const query2 = qs.stringify(
    {
      filters: {
        Serial: {
          $contains: serial,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data: id } = useGetAssetQuery(query2);

  const ApiData = data?.data.map((data) => {
    const ReqId = data.id;
    const employee = data.attributes.employee.data?.attributes;
    return { ReqId, ...data.attributes, ...employee };
  });

  const handleDelete = async (ReqId) => {
    deleteMoveRequest(ReqId);
    success("تم الحذف بنجاح");
  };
  const columns = [
    {
      title: "Employee Name(القديم)",
      dataIndex: "Name",
      key: "Name",
      align: "center",
    },
    {
      title: "Employee I.D",
      dataIndex: "EmployeeId",
      key: "EmployeeId",
      align: "center",
    },
    {
      title: "Moved Employee Name(الجديد)",
      dataIndex: "MoveEmployee",
      key: "MoveEmployee",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
      align: "center",
    },
    {
      title: "SERIAL NUMBER",
      dataIndex: "ItemSerial",
      key: "ItemSerial",
      align: "center",
    },
    {
      title: "isApproved",
      dataIndex: "isApproved",
      align: "center",
      key: "isApproved",
      render: (value) => {
        return value ? "Approved" : "Pending";
      },
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        const newRecord = (record.ItemSerial = record.ItemSerial.replace(
          /[\t\n\s]+/g,
          ""
        ));

        const update = {
          id,
          Submit: {
            employee: record.Trans_EmpId,
            status: "transferred",
          },
        };

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Popconfirm
                disabled={record.isApproved}
                title="Sure to update?"
                onConfirm={() => {
                  updateAsset(update);
                  updateMoveRequest(record.ReqId);
                }}
              >
                <Button
                  disabled={record.isApproved}
                  onClick={() => setSerial(newRecord)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  قبول
                </Button>
              </Popconfirm>

              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.ReqId)}
              >
                <Button>Delete</Button>
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div style={{ overflow: "auto" }}>
      <Table
        rowClassName={() => "editable-row"}
        bordered
        rowKey={(record) => record.ReqId}
        dataSource={ApiData}
        columns={columns}
      />
    </div>
  );
};

export default MoveRequests;
