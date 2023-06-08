import { Col, Row, Card, Button, Checkbox, Form, Input, message } from 'antd'
import { Component } from 'react'
import LOGO from '../assets/logo-social.png'
import LOGO1 from '../assets/logo.svg'
import LOGO2 from '../assets/logo.png'
import AuthenticationService from '../Services/AuthenticationService'

class UserLoginComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  handleUsernameChange = (event) => {
    // console.log('event', event)
    this.setState({
      username: event.target.value,
    })
  }

  handlePasswordChange = (event) => {
    // console.log('event', event)
    this.setState({
      password: event.target.value,
    })
  }

  onClickSignUp = async (event) => {
    // event.preventDefault()
    const { username, password } = this.state
    try {
      const response = await AuthenticationService.executedAuthentiationService(
        username,
        password
      )
      console.log('response', response)
      if (response && response.status === 200) {
        if (response.data.success) {
          AuthenticationService.loginForJwt(username, response.data.uuid)
          window.location.href = '/admin'
        }
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  render() {
    const onFinish = (values) => {
      console.log('Success:', values)
      // this.handleChange(values)
      this.onClickSignUp(values)
    }
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo)
    }

    return (
      <Row justify={'center'}>
        <Col span={8}>
          <img
            src={LOGO1}
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
                <Input onChange={this.handleUsernameChange} />
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
                <Input.Password onChange={this.handlePasswordChange} />
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
}

export default UserLoginComponent
