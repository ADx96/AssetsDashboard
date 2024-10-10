import React, { createRef, useState, useRef } from 'react'
import { Form, Button, Input, Select } from 'antd'
import ReportsTable from '../ReportsTable'
import ReportsExport from '../dashboard/ReportsExport'
import { useGetAssetsQuery } from '../../Redux/Api/AssetsApi'
import qs from 'qs'
import { workPlaces } from './helpers'

const RequestAssetDataForm = () => {
  const pdfRef = useRef(null)
  const formRef = createRef()
  const { Option } = Select
  const [value, setValues] = useState('')

  const getSelected = (value) => {
    if (value.selected === 'Building') {
      return value.text
    }

    if (value.selected === 'Floor') {
      return value.Building
    }
    return ''
  }

  const checkLength =
    value.text?.length > 5
      ? {
          $contains: value.selected === 'Serial' ? value.text : ''
        }
      : { $eq: value.selected === 'Serial' ? value.text : '' }

  const filter = {
    filters: {
      Serial: {
        ...checkLength
      },
      ItemName: {
        $contains: value.ItemName || (value.selected === 'AllItem' ? value.text : '') || ''
      },
      Floor: {
        $eq: value.selected === 'Floor' ? value.text : ''
      },
      isDropped: {
        $eq: value.selected === 'Dropped' ? true : false
      },
      Building: {
        $eq: getSelected(value)
      },
      Office: {
        $contains: value.selected === 'Office' ? value.text : ''
      },
      employee: {
        Name: {
          $contains: value.selected === 'Name' ? value.text : ''
        },
        EmployeeId: {
          $eq: value.selected === 'EmployeeId' ? value.text : ''
        },
        JobTitle: {
          $contains: value.JobTitle || ''
        },
        WorkPlace: {
          $contains: value.WorkPlace || ''
        }
      }
    }
  }

  const checkedFilter = (obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      if (typeof value === 'object') {
        checkedFilter(value) // recursively check nested object properties
      } else if (value === '') {
        delete obj[key] // delete the key if the value matches the given string
      }
    })
    return obj
  }
  const newFilter = checkedFilter(filter)
  const query = qs.stringify(
    {
      populate: 'employee',
      ...newFilter,
      pagination: {
        pageSize: 1200
      }
    },
    {
      encodeValuesOnly: true // prettify URL
    }
  )

  const { data, isLoading, refetch, isFetching } = useGetAssetsQuery(query)

  if (isLoading) {
    return <></>
  }

  const combinedArray = data?.data?.map((data) => {
    const newData = data?.attributes?.employee?.data?.attributes.JobTitle
    return newData
  })

  const itemName = data.data.map((data) => {
    const newData = data?.attributes.ItemName
    return newData
  })

  const newItemName = [...new Set(itemName)]
    .filter((value) => value !== undefined)
    .map((item) => item.replace(/\t/g, '').trim())

  const newJobTitle = [...new Set(combinedArray)]
    .filter((value) => value !== undefined)
    .map((item) => item.replace(/\t/g, '').trim())

  const removeDuplicatedItem = [...new Set(newItemName)]

  const removeDuplicatedJobTitle = [...new Set(newJobTitle)]

  const onFinish = async (values) => {
    if (values.selected === 'Dropped') {
      values.Dropped = true
    }
    values.text?.trimEnd()
    setValues(values)
    await refetch()
    formRef.current?.resetFields()
  }

  return (
    <>
      {value.text || value.JobTitle || value.ItemName || value.Dropped ? (
        <div style={{ overflow: 'auto' }}>
          <ReportsTable
            data={data}
            value={value}
            isFetching={isFetching}
            isLoading={isLoading}
            pdfRef={pdfRef}
            setValues={setValues}
            query={query}
          />
        </div>
      ) : (
        <>
          <Form
            name="basic"
            ref={formRef}
            layout="vertical"
            style={{ textAlign: 'center' }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            labelCol={{
              sm: {
                span: 16,
                offset: 8
              }
            }}
            wrapperCol={{
              span: 24,
              sm: {
                span: 8,
                offset: 8
              }
            }}
            autoComplete="off"
          >
            <Form.Item label="بحث عن طريق" name="selected">
              <Select onChange={(val) => setValues(val)}>
                <Option value={'Name'}>Employee Name</Option>
                <Option value={'EmployeeId'}>Employee ID</Option>
                <Option value={'Serial'}>Serial Number</Option>
                <Option value={'ItemName'}>Item Name</Option>
                <Option value={'AllItem'}>All Items</Option>
                <Option value={'Floor'}>Floor</Option>
                <Option value={'Building'}>Building</Option>
                <Option value={'Office'}>Office</Option>
                <Option value={'JobTitle'}>Job Title</Option>
                <Option value={'WorkPlace'}>Work Place</Option>
                <Option value={'Dropped'}>Dropped Assets</Option>
              </Select>
            </Form.Item>

            {value === 'Building' && (
              <Form.Item
                label=" Select Building"
                name="Building"
                rules={[
                  {
                    required: value === 'Floor',
                    message: 'Required!'
                  }
                ]}
              >
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder="Select a Building"
                  optionFilterProp="children"
                >
                  <Option value={'North'}>{'North'}</Option>
                  <Option value={'South'}>{'South'}</Option>
                </Select>
              </Form.Item>
            )}

            {value === 'WorkPlace' && (
              <Form.Item
                label="Work Place"
                name="WorkPlace"
                rules={[{ required: true, message: 'WorkPlace is Required!' }]}
              >
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder="Select a WorkPlace"
                >
                  {workPlaces.map((data, index) => (
                    <Option key={index} value={data}>
                      {data}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            {value !== 'JobTitle' &&
              value !== 'WorkPlace' &&
              value !== 'ItemName' &&
              value !== 'Dropped' &&
              value !== 'Building' && (
                <Form.Item label={`Enter ${value}`} name="text" rules={[{ required: true, message: 'Required!' }]}>
                  <Input />
                </Form.Item>
              )}
            {value === 'Floor' && (
              <Form.Item
                label=" Select Building"
                name="Building"
                rules={[
                  {
                    required: value === 'Floor',
                    message: 'Required!'
                  }
                ]}
              >
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder="Select a Building"
                  optionFilterProp="children"
                >
                  <Option value={'North'}>{'North'}</Option>
                  <Option value={'South'}>{'South'}</Option>
                </Select>
              </Form.Item>
            )}
            {value === 'JobTitle' && (
              <Form.Item label="اختر البيانات" name="JobTitle" rules={[{ required: true, message: 'Required!' }]}>
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder="Select a JobTitle"
                  optionFilterProp="children"
                >
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    removeDuplicatedJobTitle?.map((data, index) => {
                      return (
                        <Option value={data} key={index}>
                          {data}
                        </Option>
                      )
                    })
                  )}
                </Select>
              </Form.Item>
            )}
            {(value === 'JobTitle' || value === 'ItemName') && (
              <Form.Item
                label="اختر البيانات"
                name="ItemName"
                rules={[
                  {
                    required: value === 'ItemName',
                    message: 'Required!'
                  }
                ]}
              >
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder="Select a ItemName"
                  optionFilterProp="children"
                >
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    removeDuplicatedItem?.map((data, index) => {
                      return (
                        <Option value={data} key={index}>
                          {data}
                        </Option>
                      )
                    })
                  )}
                </Select>
              </Form.Item>
            )}

            <div style={{ textAlign: 'center' }}>
              <Button style={{ borderRadius: '5px', width: '150px' }} type="primary" htmlType="submit" size={'large'}>
                استعلام
              </Button>
            </div>
          </Form>
          <ReportsExport pdfRef={pdfRef} />
        </>
      )}
    </>
  )
}

export default RequestAssetDataForm
