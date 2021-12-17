import { useState, useEffect } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListadoPacientes from './components/ListadoPacientes'

function App() {


  //se declara como arreglo de datos al registro
  const [pacientes, setPacientes] = useState([]);

  const [paciente, setPaciente] = useState({});


  
  useEffect( () => {
      const obtenerLS = () => {
         const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];

         setPacientes(pacientesLS);
      }
      obtenerLS();
  },[]);



   useEffect( () => {
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
   }, [pacientes]);




  const eliminarPaciente = (id) => {
     //console.log('Eliminando paciente '. id);
     const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);

     setPacientes(pacientesActualizados);
  }
  
  //se le mandan propiedades desde aqui al header
  return (
   <div className="container mx-auto mt-20">
       <Header  />
       <div className="mt-12 md:flex">
          <Formulario 
          //le pasamos los pacientes que ya existian
             pacientes={pacientes}
            //le pasamos la funcion modificadora
             setPacientes={setPacientes}

             //verificar como es que funciona
             paciente={paciente}

             setPaciente={setPaciente}
          />
          <ListadoPacientes 
          pacientes={pacientes} 
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
          />
       </div>
      
   </div>

  )
}

export default App
