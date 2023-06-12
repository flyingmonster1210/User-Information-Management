import { Breadcrumb, Avatar, Button, List, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import VIP from '../assets/vip.png'
import MyBreadcrumb from '../Components/MyBreadcrumb'
import ShowUsersService from '../Services/ShowUsersService'

const UserList = () => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])

  let returnType = '-1'
  useEffect(() => {
    try {
      const getUserList = async (returnType) => {
        const response = await ShowUsersService.filterUser(returnType)
        console.log('response:', response)
        // console.log('test:', response.data)

        console.log(response.data.userList)
        setList(response.data.userList)
        setInitLoading(false)
      }

      getUserList(returnType)
    } catch (error) {
      console.log('catch error:', error)
    }
  }, [returnType])

  const routeItem = [
    {
      title: 'Show all users',
      href: '/',
    },
  ]
  return (
    <>
      <MyBreadcrumb items={routeItem} />
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">remove</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={item.username + '.png'}
                title={'Introduction of ' + item.username}
                description={item.intro || 'Nothing here!'}
              />
              <div>
                {item.vip ? (
                  <img
                    src={VIP}
                    style={{
                      maxHeight: '20px',
                      maxWidth: '20px',
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  )
}
export default UserList
