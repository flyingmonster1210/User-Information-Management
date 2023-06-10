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
import MenuItem from 'antd/es/menu/MenuItem'
import { useEffect, useState } from 'react'
import LOGO from '../assets/react-logo.png'
import AuthenticationService from '../Services/AuthenticationService'

const { Header, Sider, Content } = Layout

// window.onload = () => {
//   if (!AuthenticationService.isUserLoggedIn()) window.location.href = '/login'
// }

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    AuthenticationService.logout()
    window.location.href = '/login'
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'nav 1',
      children: [
        {
          key: 'child1',
          icon: <UserOutlined />,
          label: 'nav 1',
        },
      ],
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ]
  const items = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Account center
        </a>
      ),
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
        height: '100vh',
        width: '100vw',
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
          defaultSelectedKeys={['1']}
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
          Content
        </Content>
      </Layout>
    </Layout>
  )
}
export default MainLayout
