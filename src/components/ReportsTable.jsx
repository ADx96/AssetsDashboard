import { Table, Button, Space } from 'antd'
import React from 'react'
import { message } from 'antd'
import { CSVLink } from 'react-csv'
import ExportPdf from './ExportPdf'

const ReportsTable = ({ data, isLoading, setValues, pdfRef, value, isFetching }) => {
  const { success } = message

  const ApiData = data?.data.map((data) => {
    const { attributes } = data
    const employee = data?.attributes.employee.data?.attributes
    const Name = employee?.Name
    const EmployeeId = employee?.EmployeeId
    const JobTitle = employee?.JobTitle
    const WorkPlace = employee?.WorkPlace
    return {
      EmployeeId,
      ...attributes,
      Name,
      JobTitle,
      WorkPlace
    }
  })

  if (isLoading || isFetching) {
    return <h1>loading</h1>
  }

  const columns = [
    {
      title: 'number',
      dataIndex: 'num',
      key: 'num',
      align: 'center',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      align: 'center'
    },
    {
      title: 'Emp ID',
      dataIndex: 'EmployeeId',
      key: 'EmployeeId',
      align: 'center'
    },
    {
      title: 'Job Title',
      dataIndex: 'JobTitle',
      key: 'JobTitle',
      align: 'center'
    },
    {
      title: 'Work Place',
      dataIndex: 'WorkPlace',
      key: 'WorkPlace',
      align: 'center'
    },
    {
      title: 'SERIAL NUMBER',
      dataIndex: 'Serial',
      key: 'Serial',
      align: 'center'
    },
    {
      title: 'ITEM',
      dataIndex: 'ItemName',
      key: 'ItemName',
      align: 'center'
    },
    {
      title: 'SPECIFICATION',
      dataIndex: 'Specs',
      key: 'Specs',
      align: 'center'
    },
    {
      title: 'OS',
      dataIndex: 'os',
      key: 'os',
      align: 'center'
    },
    {
      title: 'EXTENSION',
      dataIndex: 'Extension',
      key: 'Extension',
      align: 'center',
      editable: true
    },
    {
      title: 'MOBILE',
      dataIndex: 'Mobile',
      key: 'Mobile',
      align: 'center',
      editable: true
    },
    {
      title: 'BUILDING',
      dataIndex: 'Building',
      key: 'Building',
      align: 'center'
    },
    {
      title: 'FlOOR',
      dataIndex: 'Floor',
      key: 'Floor',
      align: 'center'
    },
    {
      title: 'OFFICE',
      dataIndex: 'Office',
      key: 'Office',
      align: 'center'
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      align: 'center'
    },
    {
      title: 'Add Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center'
    }
  ]

  const Name = ApiData[0]?.Name
  const Id = ApiData[0]?.EmployeeId
  const EmoloyeesIds = ApiData?.map((data) => data.EmployeeId)
  const uniqueArr = [...new Set(EmoloyeesIds)]

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={() => setValues('')}
          style={{ borderRadius: '5px', width: '150px' }}
          type="primary"
          htmlType="submit"
          size={'large'}
        >
          رجوع
        </Button>
      </div>
      <Space>
        <Button style={{ borderRadius: '5px', width: '150px' }} type="outline" htmlType="submit" size={'large'}>
          <CSVLink
            filename={'Expense_Table.csv'}
            data={ApiData}
            className="btn btn-primary"
            onClick={() => {
              success('The file is downloading')
            }}
          >
            Export to CSV
          </CSVLink>
        </Button>
        <ExportPdf pdfRef={pdfRef} />
      </Space>
      <div ref={pdfRef}>
        <div style={{ textAlign: 'right' }}>
          {value.selected === 'Name' || value.selected === 'EmployeeId' || value.selected === 'Serial' ? (
            <>
              <h2> الاسم: {Name} </h2>
              <h2>{Id} :الوظيفي الرقم</h2>
            </>
          ) : (
            <h1 style={{ fontSize: '30px' }}>{ApiData.length} :مجموع العهد</h1>
          )}

          {value.selected === 'Name' && value.ItemName === 'ItemName ' ? (
            <h1 style={{ fontSize: '30px' }}>{ApiData.length} :مجموع العهد</h1>
          ) : (
            <></>
          )}
          {value.selected === 'WorkPlace' || value.selected === 'ItemName ' ? (
            <h1 style={{ fontSize: '30px' }}>{uniqueArr.length} :مجموع الموظفين</h1>
          ) : (
            <></>
          )}
        </div>

        <Table rowClassName={() => 'editable-row'} bordered pagination={false} dataSource={ApiData} columns={columns} />
      </div>
    </>
  )
}

export default ReportsTable
