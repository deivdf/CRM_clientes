import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../api/Clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
export async function loader({ params }){
   const cliente = await obtenerCliente(params.clienteId);
    console.log(cliente);
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
    }
    return cliente;
}
export async function action({request, params}) {
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
    //actualizar cliente
    await actualizarCliente(params.clienteId, data)
    // ese redireccionamiento solo se usa en el action
    return redirect('/')
    
}
function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();
  return (
    <div>
            <h1 className="text-4xl font-bold text-blue-900">Editar Clientes</h1>
            <p className="text-xl text-gray-500 mt-3">A continuacion podras editar los datos de un cliente</p>
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
                cliente={cliente}
                />
                <input 
                type="submit"
                className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                value={'Actualizar Cliente'}
                />
            </Form>
            </div>
    </div>
  )
}

export default EditarCliente
