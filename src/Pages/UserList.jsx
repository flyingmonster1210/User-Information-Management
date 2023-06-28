import { Breadcrumb, Avatar, Button, List, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import VIP from '../assets/vip.png'
import MyBreadcrumb from '../Components/MyBreadcrumb'
import ShowUsersService from '../Services/ShowUsersService'
import isAddingUserStore from '../Store/isAddingUserStore'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const navigate = useNavigate()
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])

  let returnType = '-1'
  useEffect(() => {
    try {
      const getUserList = async (returnType) => {
        const response = await ShowUsersService.filterUser(returnType)
        // console.log('response:', response)
        // console.log(response.data.userList)
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

  const changeToEditUser = (id) => {
    isAddingUserStore.changeMode(false)
    // console.log(id)
    navigate('/editUser?id=' + id)
  }
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
              // <a onClick={changeToEditUser} href={'/editUser?id=' + item.id}>
              <a onClick={() => changeToEditUser(item.id)}>edit</a>,
              <a href="list-loadmore-more">remove</a>,
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
