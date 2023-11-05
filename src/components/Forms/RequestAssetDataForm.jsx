import React, { createRef, useState, useRef } from 'react';
import { Form, Button, Input, Select } from 'antd';
import ReportsTable from '../ReportsTable';
import ReportsExport from '../dashboard/ReportsExport';
import { useGetAssetsQuery } from '../../Redux/Api/AssetsApi';
import qs from 'qs';

const RequestAssetDataForm = () => {
  const pdfRef = useRef(null);
  const formRef = createRef();
  const { Option } = Select;
  const [value, setValues] = useState('');

  const checkLength =
    value.text?.length > 5
      ? {
          $contains: value.selected === 'Serial' ? value.text : '',
        }
      : { $eq: value.selected === 'Serial' ? value.text : '' };

  const filter = {
    filters: {
      Serial: {
        ...checkLength,
      },
      ItemName: {
        $contains:
          value.selected === 'ItemName' ? value.text : '' || value.ItemName,
      },
      Floor: {
        $eq: value.selected === 'Floor' ? value.text : '',
      },
      Building: {
        $eq: value.selected === 'Building' ? value.text : '',
      },
      Office: {
        $contains: value.selected === 'Office' ? value.text : '',
      },
      employee: {
        Name: {
          $contains: value.selected === 'Name' ? value.text : '',
        },
        EmployeeId: {
          $contains: value.selected === 'EmployeeId' ? value.text : '',
        },
        JobTitle: {
          $contains: value.selected === 'JobTitle' ? value.text : '',
        },
        WorkPlace: {
          $contains: value.selected === 'WorkPlace' ? value.text : '',
        },
      },
    },
  };

  const checkedFilter = (obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === 'object') {
        checkedFilter(value); // recursively check nested object properties
      } else if (value === '') {
        delete obj[key]; // delete the key if the value matches the given string
      }
    });
    return obj;
  };
  const newFilter = checkedFilter(filter);
  const query = qs.stringify(
    {
      populate: 'employee',
      ...newFilter,
      pagination: {
        pageSize: 1200,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, isLoading, refetch, isFetching } = useGetAssetsQuery(query);

  if (isLoading) {
    return <></>;
  }

  const combinedArray = data.data.map((data) => {
    const newData = data.attributes.employee.data?.attributes.JobTitle;
    return newData;
  });

  const WorkPlace = data.data.map((data) => {
    const newData = data.attributes.employee.data?.attributes.WorkPlace;
    return newData;
  });

  const itemName = data.data.map((data) => {
    const newData = data.attributes.ItemName;
    return newData;
  });

  const newItemName = [...new Set(itemName)]
    .filter((value) => value !== undefined)
    .map((item) => item.replace(/\t/g, '').trim());

  const uniqueArray = [...new Set(combinedArray)]
    .filter((value) => value !== undefined)
    .map((item) => item.replace(/\t/g, '').trim());

  const newWorkPlace = [...new Set(WorkPlace)]
    .filter((value) => value !== undefined)
    .map((item) => item.replace(/\t/g, '').trim());

  const onFinish = async (values) => {
    setValues(values);
    formRef.current?.resetFields();
    await refetch();
    console.log(values);
  };

  return (
    <>
      {value.text ? (
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
            name='basic'
            ref={formRef}
            layout='vertical'
            style={{ textAlign: 'center' }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            labelCol={{
              sm: {
                span: 16,
                offset: 8,
              },
            }}
            wrapperCol={{
              span: 24,
              sm: {
                span: 8,
                offset: 8,
              },
            }}
            autoComplete='off'
          >
            <Form.Item label='بحث عن طريق' name='selected'>
              <Select onChange={(val) => setValues(val)}>
                <Option value={'Name'}>Employee Name</Option>
                <Option value={'EmployeeId'}>Employee ID</Option>
                <Option value={'Serial'}>Serial Number</Option>
                <Option value={'ItemName'}>Item Name</Option>
                <Option value={'Floor'}>Floor</Option>
                <Option value={'Building'}>Building</Option>
                <Option value={'Office'}>Office</Option>
                <Option value={'JobTitle'}>Job Title</Option>
                <Option value={'WorkPlace'}>Work Place</Option>
              </Select>
            </Form.Item>
            {value !== 'JobTitle' && value !== 'WorkPlace' && (
              <Form.Item
                label='ادخل البيانات'
                name='text'
                rules={[{ required: true, message: 'Required!' }]}
              >
                <Input />
              </Form.Item>
            )}
            {value === 'JobTitle' && (
              <Form.Item
                label='اختر البيانات'
                name='text'
                rules={[{ required: true, message: 'Required!' }]}
              >
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder='Select a JobTitle'
                  optionFilterProp='children'
                >
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    uniqueArray.map((data, index) => {
                      return <Option key={index}>{data}</Option>;
                    })
                  )}
                </Select>
              </Form.Item>
            )}
            {(value === 'Name' ||
              value === 'WorkPlace' ||
              value === 'JobTitle') && (
              <Form.Item
                label='اختر البيانات'
                name='ItemName'
                rules={[{ required: true, message: 'Required!' }]}
              >
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder='Select a ItemName'
                  optionFilterProp='children'
                >
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    newItemName.map((data, index) => {
                      return <Option key={index}>{data}</Option>;
                    })
                  )}
                </Select>
              </Form.Item>
            )}
            {value === 'WorkPlace' && (
              <Form.Item
                label='اختر البيانات'
                name='WorkPlace'
                rules={[{ required: true, message: 'Required!' }]}
              >
                <Select
                  style={{ marginBottom: '10px', display: 'block' }}
                  showSearch
                  allowClear
                  placeholder='Select a WorkPlace'
                  optionFilterProp='children'
                >
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    newWorkPlace.map((data, index) => {
                      return <Option key={index}>{data}</Option>;
                    })
                  )}
                </Select>
              </Form.Item>
            )}

            <div style={{ textAlign: 'center' }}>
              <Button
                style={{ borderRadius: '5px', width: '150px' }}
                type='primary'
                htmlType='submit'
                size={'large'}
              >
                استعلام
              </Button>
            </div>
          </Form>
          <ReportsExport pdfRef={pdfRef} />
        </>
      )}
    </>
  );
};

export default RequestAssetDataForm;
