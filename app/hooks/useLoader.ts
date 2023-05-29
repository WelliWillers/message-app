import { useContext } from 'react'
import { LoaderContext } from '../contexts/LoaderContext'

export const useLoad = () => {
    return useContext(LoaderContext)
}
