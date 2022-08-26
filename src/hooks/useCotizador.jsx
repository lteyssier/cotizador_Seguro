import { useContext } from "react"
import CotizadorConext from "../context/CotizadorProvider"

const useCotizador = ()=> {
    return useContext(CotizadorConext)
}

export default useCotizador