import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme, Dropdown, Space } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem'
import { useState } from 'react'
import LOGO from '../assets/react-logo.png'
import AuthenticationService from '../Services/AuthenticationService'

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
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
]

const { Header, Sider, Content } = Layout

// window.onload = () => {
//   if (!AuthenticationService.isUserLoggedIn()) window.location.href = '/login'
// }

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
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
export default App
