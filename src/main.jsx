import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/index'
import ErrorPage from './components/ErrorPages'
import EditarCliente, {loader as EditarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import { action as eliminarClienteAction } from './components/Cliente'
// Routes
const router = createBrowserRouter([
 {
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Index />,
      loader: clientesLoader,
      errorElement: <ErrorPage />
    },
    {
      path: '/Clientes/Nuevo',
      element: <NuevoCliente />,
      action: nuevoClienteAction,
      errorElement: <ErrorPage />
    },
    {
      path: '/Clientes/:clienteId/editar',
      element: <EditarCliente />,
      loader: EditarClienteLoader,
      action: editarClienteAction,
      errorElement: <ErrorPage />
    },
    {
      path: '/Clientes/:clienteId/eliminar',
      action: eliminarClienteAction
    }
  ]
 }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
