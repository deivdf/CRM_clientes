//el useAction data se usa para hacer llamado a los funciones que se exportan en el archivo action
import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import {crearCliente} from '../api/Clientes'
// exporta para hacer el llamado a lo que se envia desde el formulario en el componente Formulario.jsx
export async function action({request}) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const email = formData.get('email')
  //console.log(data)
  const errores = []
  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  //validacion de email
  if(!regex.test(email)){
    errores.push('El email no es valido')
  }
  //validaciond e campos vacios
  if(Object.values(data).includes('')){
    errores.push('Todos los campos son obligatorios')
  }
  if(Object.keys(errores).length){
    return errores
  }
  //crear cliente
  await crearCliente(data)
  // ese redireccionamiento solo se usa en el action
  return redirect('/')
  
}
// funcion que se ejecuta cuando se envia el formulario
function NuevoCliente() {
  // useActionData es para obtener los datos que se envian desde el action en este caso data
  const errores = useActionData()
  // navigate es para navegar a otra ruta desde el componente
  const navigate = useNavigate()
  return (
    <>
        <h1 className="text-4xl font-bold text-blue-900">Nuevo Clientes</h1>
        <p className="text-xl text-gray-500 mt-3">Llena todos los campos para ingresar un nuevo cliente</p>
        <div className="flex justify-end">
            <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-lg"
            onClick={() => navigate(-1)}>
              volver
              
            </button>
        </div>
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
          {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
          <Form
            method="post"
            noValidate
          >
            <Formulario 
            />
            <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"/>
          </Form>
        </div>
    </>
  )
}

export default NuevoCliente
