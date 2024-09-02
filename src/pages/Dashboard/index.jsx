import React from 'react'
import useLoginInterceptor from '@/hooks/useLoginInterceptor'
export default function Dashboard() {
  useLoginInterceptor()
  return (
    <div>Dashboard</div>
  )
}
