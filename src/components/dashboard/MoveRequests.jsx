import { Table, Button, Popconfirm } from "antd";
import qs from "qs";
import React, { useState } from "react";
import {
  useGetAssetQuery,
  useUpdateAssetMutation,
} from "../../Redux/Api/AssetsApi";
import {
  useGetMoveRequestsQuery,
  useUpdateMoveRequestMutation,
} from "../../Redux/Api/RequestApi";

const query = {
  populate: "employee",
};

const MoveRequests = () => {
  const [serial, setSerial] = useState("C915HEBYG1056519");
  const { data, isLoading } = useGetMoveRequestsQuery(query);
  const [updateMoveRequest] = useUpdateMoveRequestMutation();
  const [updateAsset] = useUpdateAssetMutation();

  const query2 = qs.stringify(
    {
      populate: "employee",
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
    const id = data.id;
    const employee = data.attributes.employee.data.attributes;
    return { id, ...data.attributes, ...employee };
  });

  const columns = [
    {
      title: "Employee Name",
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
      title: "Moved Employee Name",
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
        const update = {
          id,
          employee: {},
        };

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Popconfirm
              disabled={record.isApproved}
              title="Sure to update?"
              onConfirm={() => {
                updateAsset(update);
                updateMoveRequest({ data: { EmployeeId: record.Trans_EmpId } });
              }}
            >
              <Button
                disabled={record.isApproved}
                onClick={() => setSerial(record.ItemSerial)}
                style={{
                  marginRight: 8,
                }}
              >
                قبول
              </Button>
            </Popconfirm>
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
        dataSource={ApiData}
        columns={columns}
      />
    </div>
  );
};

export default MoveRequests;
