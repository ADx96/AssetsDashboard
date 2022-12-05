import DataTable from "../components/DataTable";

import { useGetAssetsQuery } from "../Redux/Api/AssetsApi";
import { ContextProvider } from "../Hooks/ContextProvider";
import { Button, Input, Popconfirm } from "antd";
import { EditableCell } from "../components/Forms/Editable";
import { useState } from "react";
import qs from "qs";
import { useUpdateDropRequestMutation } from "../Redux/Api/RequestApi";
import { useUpdateAssetMutation } from "../Redux/Api/AssetsApi";

const DroppedAssets = () => {
  const [search, setSearch] = useState();
  const [updateAsset] = useUpdateAssetMutation();
  const [updateDropRequest] = useUpdateDropRequestMutation();

  const { Search } = Input;
  const [currentPage, setCurrentPage] = useState();
  const query = qs.stringify(
    {
      populate: "employee",
      filters: {
        Serial: {
          $contains: search,
        },
        isDropped: {
          $eq: true,
        },
      },
      pagination: {
        page: currentPage,
        pageSize: 10,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, isLoading } = useGetAssetsQuery(query);

  const ApiData = data?.data.map((data) => {
    const id = data.id;
    const { attributes } = data;
    return { id, ...attributes };
  });

  const columns = [
    {
      title: "SERIAL NUMBER",
      dataIndex: "Serial",
      key: "Serial",
      align: "center",
    },
    {
      title: "ITEM",
      dataIndex: "ItemName",
      key: "ItemName",
      align: "center",
    },
    {
      title: "SPECIFICATION",
      dataIndex: "Specs",
      key: "Specs",
      align: "center",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
      align: "center",
    },
    {
      title: "BUILDING",
      dataIndex: "Building",
      key: "Building",
      align: "center",
    },
    {
      title: "FlOOR",
      dataIndex: "Floor",
      key: "Floor",
      align: "center",
    },
    {
      title: "OFFICE",
      dataIndex: "Office",
      key: "Office",
      align: "center",
    },
    {
      title: "Dropped",
      dataIndex: "isDropped",
      key: "isDropped",
      align: "center",
      render: (value) => {
        return value && "عهد ساقطة";
      },
    },
    {
      title: "Add Date",
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
        const AssetId = record.id;
        const update = {
          AssetId,
          Submit: {
            employee: null,
            isDropped: false,
          },
        };

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Popconfirm
              title="Sure to update?"
              onConfirm={() => {
                updateAsset(update);
                updateDropRequest(record.ReqId);
              }}
            >
              <Button
                disabled={record.isApproved}
                style={{
                  marginRight: 8,
                }}
              >
                ارجاع
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const total = data?.meta.pagination.total;
  const PageSize = data?.meta.pagination.pageSize;

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <ContextProvider>
      <div style={{ overflow: "auto" }}>
        <Search
          style={{ width: "40%" }}
          placeholder="Search By Item Serial"
          onSearch={(value) => {
            setSearch(value);
          }}
        />

        <DataTable
          total={total}
          PageSize={PageSize}
          data={ApiData}
          setCurrentPage={setCurrentPage}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={columns}
        />
      </div>
    </ContextProvider>
  );
};

export default DroppedAssets;
