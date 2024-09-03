import { Button } from 'antd/es'
import GTabs from '../components/GTabs/GTabs'
import { useState } from 'react'

export default function home() {
  const [currentName, setCurrentName] = useState('btn1')
  return (
    <div>
      Home
      <GTabs name={currentName} onChange={(val) => setCurrentName(val)}>
        <Button type="primary" name="btn1">btn1</Button>
        <Button type="primary" name="btn2">btn2</Button>
        <Button type="primary" name="btn3">btn3</Button>
      </GTabs>
    </div>
  )
}
