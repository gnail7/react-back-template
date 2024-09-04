import App from '../App'
import LazyComponent from './LazyComponent'
import { useState, useEffect } from 'react'
import { useLoginInterceptor } from '@/hooks/useLoginInterceptor'
import { useRoutes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import { cloneDeep } from 'lodash-es'

const modules = import.meta.glob('/src/pages/**/*.jsx')

const redirectRoute = {
  path: '/',
  element: <Navigate to="/home" />,
}

const defaultRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        name: 'home',
        element: (
          <LazyComponent
            importFunc={() => import('@/pages/Home')}
            Fallback={<Spin />}
          />
        ),
      },
    ],
  },
  {
    path: 'login',
    name: 'login',
    element: (
      <LazyComponent
        importFunc={() => import('@/pages/Login/Login.jsx')}
        Fallback={<Spin />}
      />
    ),
  },
]
export default function FilterRouter() {
  const [routes, setRoutes] = useState([])
  const { menuList } = useSelector((state) => state.global)
  const dynamicRoutes = cloneDeep(menuList)
  useLoginInterceptor()

  const loadRouteElement = (route) => {
    const importFunc = () => modules[`/src/pages/Dashboard${route.resourceUrl}.jsx`]()
    return {
      ...route,
      key: route.resourceId,
      label: route.resourceName,
      path: route.resourceUrl,
      element: (
        <LazyComponent
          importFunc={importFunc}
          Fallback={<div>Loading...</div>}
        />
      ),
    }
  }

  const traverseAndLoadRoutes = (routes) => {
    const loadedRoutes = routes.map((route) => {
      if (route.resourceUrl) {
        route = loadRouteElement(route)
      }

      if (route.children) {
        route.children = traverseAndLoadRoutes(route.children)
      }

      return route
    })

    return loadedRoutes
  }

  useEffect(() => {
    const initRoutes = async () => {
      const loadedDynamicRoutes = traverseAndLoadRoutes(dynamicRoutes)
      const combinedRoutes = [
        ...defaultRoutes[0].children,
        ...loadedDynamicRoutes,
      ]
      defaultRoutes[0].children = combinedRoutes
      setRoutes([
        redirectRoute,
        ...defaultRoutes,
      ])
    }
    initRoutes()
  }, [dynamicRoutes.length])

  return <>{useRoutes(routes)}</>
}
