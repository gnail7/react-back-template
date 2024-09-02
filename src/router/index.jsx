import { createBrowserRouter } from "react-router-dom"
import App  from "../App"
import  LazyComponent  from "./LazyComponent"
import { useState, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { Navigate } from "react-router-dom"

const redirectRoute = {
  path: "/",
  element: <Navigate to='/home'/>,
}

const defaultRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        name: 'home',
        element: <LazyComponent 
          importFunc={() => import('@/pages/Home')} 
          Fallback={<>loading....</>}
        />,
      },
     
    ]
  },
  {
    path: 'login',
    name: 'login',
    element: <LazyComponent 
      importFunc={() => import('@/pages/Login/Login.jsx')} 
      Fallback={<>loading....</>}
    />,
  }
]

// dynamic route part always get by the API
const dynamicRoutes = [ 
  {
    path: "/about",
    name: 'about',
    filePath: '../pages/Dashboard/index.jsx'
  }
]


export default function FilterRouter() {
  const [routes, setRoutes] = useState([]);

  const loadRouteElement = async (route) => {
    return {
      ...route,
      element: (
        <LazyComponent
          importFunc={() => import(`${route.filePath}`)}
          Fallback={<>loading....</>}
        />
      ),
    };
  };

  const traverseAndLoadRoutes = async (routes) => {
    const loadedRoutes = await Promise.all(
      routes.map(async (route) => {
        if (route.filePath) {
          route = await loadRouteElement(route);
        }

        if (route.children) {
          route.children = await traverseAndLoadRoutes(route.children);
        }

        return route;
      })
    );

    return loadedRoutes;
  };

  useEffect(() => {
    const initRoutes = async () => {
      const loadedDynamicRoutes = await traverseAndLoadRoutes(dynamicRoutes);
      const combinedRoutes = [
        ...defaultRoutes[0].children,
        ...loadedDynamicRoutes,
      ];

      setRoutes([
        redirectRoute,
        ...defaultRoutes,
        {
          ...defaultRoutes[0],
          children: [ ...combinedRoutes],
        },
      ])
      
    }

    initRoutes();
  }, [])

  return <>{useRoutes(routes)}</>;
}