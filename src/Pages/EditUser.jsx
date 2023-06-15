import MyBreadcrumb from '../Components/MyBreadcrumb'

import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd'
import { useEffect, useState } from 'react'
import AuthenticationService from '../Services/AuthenticationService'
import EditUserService from '../Services/EditUserService'
import { useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import isAddingUserStore from '../Store/isAddingUserStore'

const { TextArea } = Input
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
const EditUser = () => {
  const [params] = useSearchParams()
  const id = params.get('id')
  console.log(id)

  const routeItem = [
    {
      title: id && id !== null ? 'Edit user: xxx' : 'Add a new user',
    },
  ]

  const onFinish = (event) => {
    console.log(event)
    const { age, intro, isVip, password, username } = event
    const thisUser = {
      id: AuthenticationService.getLoggedUserID(),
      age: age,
      intro: intro,
      isVip: isVip,
      password: password,
      username: username,
    }
    const updateInfo = async (thisUser) => {
      const res = await EditUserService.updateUserInfo(thisUser)
      console.log(res)
    }
    try {
      updateInfo(thisUser)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <MyBreadcrumb items={routeItem} />

      <Form
        onFinish={onFinish}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          initialValue={id && id !== null ? 'with id' : 'without id'}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" initialValue="password">
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age" initialValue="20">
          <InputNumber />
        </Form.Item>
        <Form.Item label="VIP" name="isVip" initialValue="Yes">
          <Radio.Group>
            <Radio value="Yes"> Yes </Radio>
            <Radio value="No"> No </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Intro" name="intro" initialValue="A brief intro">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Submit">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default observer(() => <EditUser />)
