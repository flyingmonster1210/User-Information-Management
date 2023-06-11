import { Col, Row, Card, Button, Checkbox, Form, Input, message } from 'antd'
import LOGO from '../assets/react-logo.png'
import AuthenticationService from '../Services/AuthenticationService'
import { useNavigate } from 'react-router-dom'

const UserLoginComponent = () => {
  const navigate = useNavigate()

  async function onFinish(values) {
    const { username, password } = values

    try {
      // console.log('onFinish try:', username, password)
      const response = await AuthenticationService.executedAuthentiationService(
        username,
        password
      )
      // console.log('onFinish response:', response)
      if (response && response.status === 200) {
        if (response.data.success) {
          // console.log('onFinish Success:', values)
          AuthenticationService.loginForJwt(username, response.data.uuid)
          message.success('Successfully login!')
          // window.location.href = '/admin'
          navigate('/admin', { replace: true })
        } else {
          console.log('onFinish Failed:', values)
          message.error('Please double-check your username and password.', 5)
        }
      }
    } catch (error) {
      console.log('error:', error)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Row justify={'center'}>
      <Col span={8}>
        <img
          src={LOGO}
          style={{
            display: 'block',
            margin: '40px',
            maxHeight: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
        <Card
          title="Username and Password"
          style={{
            maxWidth: '100%',
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
              {/* <Input onChange={handleUsernameChange} /> */}
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
              {/* <Input.Password onChange={handlePasswordChange} /> */}
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default UserLoginComponent
