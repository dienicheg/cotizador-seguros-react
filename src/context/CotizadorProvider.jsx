import { createContext, useState } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'
const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const cotizarSeguro = () => {
        //Precio base
        let resultado = 2000
        
        //Obtener diferencia de anios
        const diferencia = obtenerDiferenciaYear(datos.year)
   
        //Restar 3% por cada anio de diferencia
        resultado -= ((diferencia * 3) * resultado) / 100

        //Aumenta de acuerdo a la marca
        resultado *= calcularMarca(datos.marca)
        
        //Aumenta de acuerdo al plan
        resultado *= calcularPlan(datos.plan)

        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setCargando(false)
            setResultado(resultado)
        }, 3000);
    }

    return (
        <CotizadorContext.Provider
            value={{
                handleChangeDatos,
                datos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider> 
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext