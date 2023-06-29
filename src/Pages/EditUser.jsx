import MyBreadcrumb from '../Components/MyBreadcrumb'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Radio, Upload } from 'antd'
import { useEffect, useRef, useState } from 'react'
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
  const onFinish = (event) => {
    // console.log('event: ',event)
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
      // console.log('res.data: ',res.data)
    }
    try {
      updateInfo(thisUser)
    } catch (error) {
      console.log(error)
    }
  }

  const [params] = useSearchParams()
  const id = params.get('id') ? params.get('id') : '0'

  const formRef = useRef(null)
  const [thisUser, setThisUser] = useState({
    username: 'new user',
    password: 'password',
    age: '20',
    vip: false,
    avatar: null,
    intro: 'Please give a brief introduction.',
  })
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await EditUserService.getUserInfo(id)
        setThisUser(
          res.data && res.data.thisUser ? res.data.thisUser[0] : thisUser
        )
      } catch (error) {
        console.log(error)
      }
    }
    getUserInfo()
    formRef && formRef.current && formRef.current.resetFields()
  }, [isAddingUserStore.isAddingUser, id, thisUser.username])
  const routeItem = [
    {
      title: isAddingUserStore.isAddingUser
        ? 'Add a new user'
        : 'Edit user: ' + thisUser.username,
    },
  ]

  const [showPreview, setShowPreview] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [filename, setFilename] = useState('')
  const [fileCount, setfileCount] = useState(0)
  const handleOnPreview = (file) => {
    setFilename(file.name || '')
    setFileUrl(file.path || file.thumbUrl)
    setShowPreview(true)
  }
  const handleOnChange = ({ file, fileList }) => {
    const { status, response } = file
    setfileCount(fileList.length)
    console.log('fileList: ', fileList)
    // console.log('file inside handleOnChange: ', file)
  }

  return (
    <div>
      <MyBreadcrumb items={routeItem} />

      <Form
        ref={formRef}
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
          initialValue={thisUser.username ? thisUser.username : 'Error'}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          initialValue={thisUser.password ? thisUser.password : 'Error'}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          initialValue={thisUser.age ? thisUser.age : -1}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="VIP"
          name="isVip"
          initialValue={thisUser.vip ? 'Yes' : 'No'}
        >
          <Radio.Group>
            <Radio value="Yes"> Yes </Radio>
            <Radio value="No"> No </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Intro"
          name="intro"
          initialValue={thisUser.intro ? thisUser.intro : 'Error'}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          {/* https://juejin.cn/post/6914178178755854344 */}
          <Upload
            action="http://localhost:4000/upload"
            listType="picture-card"
            onChange={handleOnChange}
            onBeforeUpload={(file) => console.log('file before: ', file)}
            onPreview={(file) => handleOnPreview(file)}
            maxCount={1}
          >
            {fileCount > 0 ? (
              ''
            ) : (
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
            )}
          </Upload>

          <Modal
            open={showPreview}
            onCancel={() => setShowPreview(false)}
            footer={null}
            title={filename}
          >
            <img
              src={fileUrl}
              alt="cannot find your image"
              style={{ width: '100%' }}
            />
          </Modal>
        </Form.Item>
        <Form.Item label="Submit">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default observer(() => <EditUser />)
