import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Modal, Button, Layout, Menu, theme, Dropdown, Space } from 'antd'
import { useState } from 'react'
import LOGO from '../assets/react-logo.png'
import AuthenticationService from '../Services/AuthenticationService'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import isAddingUserStore from '../Store/isAddingUserStore'

const { Header, Sider, Content } = Layout

const MainLayout = (props) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const changeShowAddUser = () => {
    isAddingUserStore.changeMode(false)
    // console.log(isAddingUserStore.isAddingUser)
    navigate('/editUser/?id=' + AuthenticationService.getLoggedUserID())
  }
  const handleOk = () => {
    setIsModalOpen(false)
    AuthenticationService.logout()
    navigate('/login')
    window.location.href = '/login'
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const location = useLocation()
  const currentKey = location.pathname === '/' ? 'showAllUsers' : 'editUser'

  const directByKey = ({ key }) => {
    isAddingUserStore.changeMode(true)
    if (key === 'showAllUsers') {
      navigate('/')
    } else {
      navigate('/editUser')
    }
  }

  const menuItems = [
    {
      key: 'showAllUsers',
      icon: <UserOutlined />,
      label: 'Show all users',
    },
    {
      key: 'editUser',
      icon: <UploadOutlined />,
      label: (
        <span>
          {isAddingUserStore.isAddingUser === true
            ? 'Add a new user'
            : 'Edit user'}
        </span>
      ),
    },
  ]
  const items = [
    {
      key: '1',
      label: <span onClick={changeShowAddUser}>Account Centre</span>,
    },
    {
      key: '2',
      danger: true,
      label: <span onClick={showModal}>Logout</span>,
    },
  ]

  return (
    <Layout
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <img
            src={LOGO}
            style={{
              maxWidth: '70%',
              maxHeight: '70%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={currentKey}
          selectedKeys={currentKey}
          onClick={directByKey}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span
            style={{
              marginRight: '2%',
              float: 'right',
            }}
          >
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Welcome,{AuthenticationService.getLoggedUserName() || 'xxx'}!
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Modal
              // title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="logoutNo" onClick={handleCancel}>
                  No
                </Button>,
                <Button key="logoutYes" onClick={handleOk} danger>
                  Yes
                </Button>,
              ]}
            >
              <p>Are you sure you want to log out?</p>
            </Modal>
          </span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default observer(MainLayout)
