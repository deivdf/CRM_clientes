import { useLoaderData } from "react-router-dom"
import Cliente  from "../components/Cliente"
// importa la data de clientes
import { obtenerClientes } from "../api/Clientes"
// este loader es para enviar datos al componente index.jsx
export function loader(){
  const clientes = obtenerClientes()
  return clientes
}


function index() {
  // useLoaderData es para obtener los datos que se envian desde el loader en este caso clientes
  const clientes = useLoaderData()

  return (
    <div>
        <h1 className="text-4xl font-bold text-blue-900">Clientes</h1>
        <p className="text-xl text-gray-500 mt-3">Administra tus clientes</p>
        {clientes.length ? (
          <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <Cliente
                  key={cliente.id}
                  cliente={cliente}
                />
              ))}
            </tbody>
          </table>
        ):(<p>
          No hay clientes
        </p>)}
    </div>
  )
}

export default index
