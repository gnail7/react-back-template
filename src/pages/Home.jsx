import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function home() { 
  const navigate = useNavigate()
  return (
    <div>
      <h1>Home</h1>
      <Button type='primary' onClick={() => navigate('/about')}>Primary Button</Button>
    </div>
  )
}
