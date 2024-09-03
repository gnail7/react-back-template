import { Flex } from 'antd'

// 使用组合模式，原来的组件类似一个接口，由子组件来实现具体的呈现效果，从而实现组件的复用
export default function GTabs({ children, name, onChange }) {
  return (
    <div>
      <h1>GTABS</h1>
      <Flex>
        {children.map((item) => <span style={{ color: 'red' }} key={item.props.name} onClick={() => onChange(item.props.name)}>{item.props.name}</span>)}
      </Flex>
      {children.length ? children.map((item) => item.props.name === name ? item : null) : null}
    </div>
  )
}
