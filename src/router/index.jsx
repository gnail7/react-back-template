import { createBrowserRouter } from "react-router-dom"
import App  from "../App"
import  LazyComponent  from "./LazyComponent"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    name: 'home',
    element: <LazyComponent 
      importFunc={() => import('../pages/home')} 
      Fallback={<>loading....</>}
    />,
  }
])

export default router