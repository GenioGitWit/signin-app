import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
// import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Auth from './module/Authentication/Auth'
import SignUp from './module/Authentication/components/signup/signup'
import SignIn from './module/Authentication/components/signin/signin'
import Dashboard from './module/Application/dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>,
    children:[
      {
      path:'/signup',
      element:<SignUp/>
    },
    {
      path:'/signin',
      element:<SignIn/>
    },
  ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
)
