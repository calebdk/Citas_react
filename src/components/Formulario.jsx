import {useState, useEffect} from 'react';
import Error from './Error';


function Formulario({pacientes, setPacientes, paciente, setPaciente}) {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);


    //useEffect que ejecuta lo que tiene 
    //dentro cada que se realiza lo que tiene en el arreglo
    useEffect(() => {
        if(Object.keys(paciente).length >0)
        {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
       
    }, [paciente])



    const generarId = () => {
        const random  = Math.random().toString(36).substring(2);
        const fecha  =  Date.now().toString(36);

        return random + fecha
    }
    



    const handleSubmit = (e) => {
       e.preventDefault();

          //validacion del formulario
          if([nombre, propietario, email, fecha, sintomas].includes(''))
          {
              console.log("Hay al menos un campo vacio");
              setError(true);
              return;
          }
         
          setError(false);
        
         //se le van asignando los valores que va a contener el arreglo del registro
         const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
            //id: generarId()
         }


          if(paciente.id)
          {
              //editando el registro
              objetoPaciente.id = paciente.id
              console.log(objetoPaciente);
              console.log(paciente);


               //se crea una constante la cual itera en el arreglo de pacientes
               //y se genera una variable en memoria "pacienteState" la cual valida
               //si el id del paciente nuevo existe en el dom
              const pacientesActualizados = pacientes.map(
                  pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState
                  )

                  //recorna el nuevo arreglo con los pacientes
                  setPacientes(pacientesActualizados);

                  //limpia la memoria
                  setPaciente({})

          }else{
             //nuevo registro
              //añadimos al paciente la info mediante la funcion modificadora
             //usando metodo spread
             objetoPaciente.id = generarId();
              setPacientes([...pacientes, objetoPaciente]);
          }

         
         //reinicar el form

         setNombre('')
         setPropietario('')
         setEmail('')
         setFecha('')
         setSintomas('')
    }

    return (
      <div className="w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

                <p className="text-lgtext-lg mt-5 text-center mb-10">
                    Añade pacientes y {' '}
                    <span className="text-indigo-600 font-bold">Administralos</span>
                </p>

                <form  onSubmit={handleSubmit} 
                       className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

                    {error &&  <Error mensaje = 'Todos los campos son obligatorios' />}

                    <div className="mb-5">
                        <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota
                        </label>
                        
                        <input
                        id="mascota"  
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Propietario
                        </label>
                        
                        <input
                        id="propietario"  
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email
                        </label>
                        
                        <input
                        id="email"  
                        type="email"
                        placeholder="Email contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta
                        </label>
                        
                        <input
                        id="alta"  
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas
                        </label>
                        
                       <textarea
                       id="sintomas"
                       placeholder="Describe los sintomas"
                       className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                       value={sintomas}
                       onChange={(e) => setSintomas(e.target.value)}
                       >
                       </textarea>
                    </div>

                     <input 
                       type="submit"
                       className="bg-indigo-600 w-full p-3 text-white uppercase 
                       font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                       value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                     />

                </form>
     </div>
    )
}

export default Formulario;