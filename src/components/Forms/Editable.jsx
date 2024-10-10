import { Input, Form, InputNumber, Select } from 'antd'
import { workPlaces } from './helpers'

export const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  let inputNode
  const { Option } = Select

  if (dataIndex === 'Building') {
    inputNode = (
      <Select name={dataIndex}>
        <Option value={'North'}>{'North'}</Option>
        <Option value={'South'}>{'South'}</Option>
      </Select>
    )
  } else if (dataIndex === 'JobTitle') {
    inputNode = (
      <Select style={{ marginBottom: '10px', display: 'block' }} showSearch allowClear placeholder="Select a WorkPlace">
        {workPlaces.map((data, index) => (
          <Option key={index} value={data}>
            {data}
          </Option>
        ))}
      </Select>
    )
  } else {
    inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
