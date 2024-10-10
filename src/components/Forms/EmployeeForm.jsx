import React, { createRef, useContext } from 'react'
import { Col, Row, Form, Space, Button, message, Input, Select } from 'antd'

import { useCreateEmployeeMutation } from '../../Redux/Api/EmployeesApi'
import ModalContext from '../../Hooks/ContextProvider'
import { workPlaces } from './helpers'

const EmployeeForm = () => {
  const formRef = createRef()
  const { setModal } = useContext(ModalContext)
  const { Option } = Select

  const { success } = message
  const [createEmployee] = useCreateEmployeeMutation()

  const onFinish = async (values) => {
    formRef.current?.resetFields()
    values.EmployeeId = values.EmployeeId.replace(/[\t\n\s]+/g, '')
    const data = { data: values }
    await createEmployee(data)
    setModal(false)
    success('تم الاضافة بنجاح')
  }
  return (
    <Form
      name="basic"
      ref={formRef}
      layout={'vertical'}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      autoComplete="off"
      resetFields
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item label="Employee Name" name="Name" rules={[{ required: true, message: 'Name is Required!' }]}>
              <Input style={{ marginBottom: '10px' }} placeholder="Basic usage" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="Employee I.D"
              name="EmployeeId"
              rules={[{ required: true, message: 'Employee is Required!' }]}
            >
              <Input style={{ marginBottom: '10px' }} placeholder="Basic usage" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item label="Job Title" name="JobTitle" rules={[{ required: true, message: 'JobTitle is Required!' }]}>
              <Input style={{ marginBottom: '10px' }} placeholder="Basic usage" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
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
          </Col>

          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item label="Mobile " name="Mobile">
              <Input style={{ marginBottom: '10px' }} placeholder="Basic usage" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24} md={{ span: 12 }}>
            <Form.Item
              label="Extension"
              name="Extension"
              rules={[{ required: true, message: 'Extension is Required!' }]}
            >
              <Input style={{ marginBottom: '10px' }} placeholder="Basic usage" />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: 'center' }}>
          <Button style={{ borderRadius: '5px', width: '150px' }} type="primary" htmlType="submit" size={'large'}>
            اضاف
          </Button>
        </div>
      </Space>
    </Form>
  )
}

export default EmployeeForm
