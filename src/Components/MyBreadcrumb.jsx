import { Breadcrumb } from 'antd'
const MyBreadcrumb = (props) => {
  // console.log(props)

  return <Breadcrumb separator=">" items={props.items} />
}
export default MyBreadcrumb
