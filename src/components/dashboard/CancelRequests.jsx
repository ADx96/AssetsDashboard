import { Button, Table, Popconfirm, message } from "antd";
import React, { useState } from "react";
import {
  useGetDropRequestsQuery,
  useUpdateDropRequestMutation,
  useDeleteDropRequestMutation,
} from "../../Redux/Api/RequestApi";
import {
  useUpdateAssetMutation,
  useGetAssetQuery,
} from "../../Redux/Api/AssetsApi";

import qs from "qs";

const query = {
  populate: "employee",
};
const CancelRequests = () => {
  const { success } = message;
  const [serial, setSerial] = useState("");
  const [updateAsset] = useUpdateAssetMutation();
  const [updateDropRequest] = useUpdateDropRequestMutation();
  const [deleteDropRequest] = useDeleteDropRequestMutation();

  const { data, isLoading } = useGetDropRequestsQuery(query);

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
    const employee = data.attributes.employee.data;
    const id = data.id;

    return { id, ...data.attributes, ...employee };
  });

  const handleDelete = async (id) => {
    deleteDropRequest(id);
    success("تم الحذف بنجاح");
  };
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
      title: "SERIAL NUMBER",
      dataIndex: "SerialNumber",
      key: "SerialNumber",
      align: "center",
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
      align: "center",
    },
    {
      title: "Accepted",
      dataIndex: "isAccepted",
      key: "isAccepted",
      align: "center",
      render: (value) => {
        return value ? "Approved" : "Pending";
      },
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        const update = {
          id,
          Submit: {
            employee: 0,
            isDropped: true,
          },
        };

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Popconfirm
              disabled={record.isApproved}
              title="Sure to update?"
              onConfirm={() => {
                updateAsset(update);
                updateDropRequest(record.id);
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
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button>Delete</Button>
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

export default CancelRequests;
