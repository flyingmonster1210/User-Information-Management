import MyBreadcrumb from '../Components/MyBreadcrumb'

function EditUser() {
  const routeItem = [
    {
      title: 'Add new user',
      href: '/editUser',
    },
  ]

  return (
    <>
      <MyBreadcrumb items={routeItem} />
    </>
  )
}

export default EditUser
