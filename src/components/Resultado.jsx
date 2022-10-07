import { useCallback,useRef, useMemo } from 'react'
import useCotizador from "../hooks/useCotizador"
import {PLANES, MARCAS} from '../constants'
function Resultado() {

    const { resultado, datos } = useCotizador()
    const { marca, year, plan } = datos


    //useCallback y useMemo son muy parecidos, no es muy comun usar ambos hooks en un mismo proyecto, pero voy a usar ambos en este caso para mostrar un ejemplo de cada, ambos sirven para evitar el rerender de React
    const [nombreMarca] = useCallback(
        MARCAS.filter(m => m.id === Number(marca)),
        [resultado]
    )
    const [nombrePlan] = useMemo(() =>
        PLANES.filter(p => p.id === Number(plan)),
        [resultado]
    )

    const yearRef = useRef(year)
  return (
    <div>{resultado === 0 ? null : (
        <div className="bg-gray-100 text-center mt-5 p-5 shadow">
            <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
            <p className="my-2">
                <span className="font-bold">Marca: </span>
                {nombreMarca.nombre}
            </p>
            <p className="my-2">
                <span className="font-bold">Plan: </span>
                {nombrePlan.nombre}
            </p>
            <p className="my-2">
                <span className="font-bold">Año del Auto: </span>
                {yearRef.current}
            </p>

            <p className="my-2 text-2xl">
                <span className="font-bold">Total Cotización: </span>
                {resultado}
            </p>
        </div>
    )}</div>
  )
}

export default Resultado