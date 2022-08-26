import {createContext, useState} from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'

const CotizadorConext = createContext()

const CotizadorProvider = ({children}) =>{

    const [datos, setDatos] = useState({
        marca:'',
        year:'',
        plan:''
    })

    const[error, setError] = useState('')
    const[resultado, setResultado] = useState(0)
    const[cargando, setCargando] = useState(false)

    const handleChangeDatos = e=>{
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        //una base
        let resultado = 2000
        //obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        // se resta el 3% por año
        resultado -= ((diferencia * 3) * resultado)/100

        //Americano 15%
        //europero 30%
        //asiatico 5%
        resultado *= calcularMarca(datos.marca)
  
        //Básico 20%
        //Completo 50%
        resultado*= calcularPlan(datos.plan)
        //formatear dinero 
        resultado = formatearDinero(resultado)

        setCargando(true)
        setTimeout(()=>{
            setResultado(resultado)
            setCargando(false)
        },3000)
       
    }

    return(
        <CotizadorConext.Provider
            value={{datos,
                    handleChangeDatos, 
                    error,
                    setError,
                    cotizarSeguro,
                    resultado, 
                    cargando
                }}
        >
            {children}
        </CotizadorConext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorConext