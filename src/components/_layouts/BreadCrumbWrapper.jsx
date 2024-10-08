import { Breadcrumb, Divider } from 'antd'
import { useSelector } from 'react-redux'

export default function BreadCrumbWrapper() {
  const { breadCrumbList = [] } = useSelector((state) => state.global)

  return (
    <>
      <Breadcrumb
        items={breadCrumbList?.map((item) => {
          return {
            key: item.resourceUrl,
            title: item.resourceName,
          }
        })}
      />
      <Divider dashed />

    </>
  )
}
