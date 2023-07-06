import MyBreadcrumb from '../Components/MyBreadcrumb'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Radio, Upload } from 'antd'
import { useEffect, useRef, useState } from 'react'
import AuthenticationService from '../Services/AuthenticationService'
import EditUserService from '../Services/EditUserService'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const id = params.get('id') ? params.get('id') : '0'
  const [avatarUrl, setAvatarUrl] = useState('null')

  const onFinish = (event) => {
    // console.log('id: ', id)
    // console.log('event: ', event)
    // console.log('avatarUrl: ', avatarUrl)
    const { age, intro, isVip, password, username } = event
    const thisNewUser = {
      id: id,
      age: age,
      intro: intro,
      isVip: isVip,
      password: password,
      username: username,
      avatar: avatarUrl,
    }
    // console.log('thisNewUser: ', thisNewUser)
    const updateInfo = async (thisNewUser) => {
      const res = await EditUserService.updateUserInfo(thisNewUser)
    }
    const addNewUser = async (newUser) => {
      const res = await EditUserService.addNewUserInfo(newUser)
    }
    try {
      isAddingUserStore.isAddingUser
        ? addNewUser(thisNewUser)
        : updateInfo(thisNewUser)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const formRef = useRef(null)
  const defaultUserInfo = {
    username: 'new user',
    password: 'password',
    age: '20',
    vip: false,
    avatar: null,
    intro: 'Please give a brief introduction.',
  }
  const [fileList, setFileList] = useState(null)
  const [thisUser, setThisUser] = useState(defaultUserInfo)
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await EditUserService.getUserInfo(id)
        setThisUser(
          res.data && res.data.thisUser ? res.data.thisUser[0] : thisUser
        )
        if (thisUser !== defaultUserInfo) {
          setfileCount(1)
          setFileList([
            { url: 'http://localhost:4000/getAvatar?path=' + thisUser.avatar },
          ])
        }
        // console.log('thisUser: ', thisUser)
        // console.log(
        //   'fileList: ',
        //   fileList,
        //   ', load? ',
        //   thisUser !== defaultUserInfo
        // )
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
    setFileList(fileList)
    if (response && response.picInfo) setAvatarUrl(response.picInfo.url)
  }
  const handleOnRemove = async (file) => {
    try {
      const url = file.url || file.response.picInfo.url
      await EditUserService.deleteImage(url)
      setAvatarUrl('null')
      setFileList([])
    } catch (error) {
      console.log(error)
    }
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
            fileList={fileList}
            onChange={handleOnChange}
            onRemove={handleOnRemove}
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
