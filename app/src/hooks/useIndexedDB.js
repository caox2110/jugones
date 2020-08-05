import { useState, useEffect } from 'react'

// Acciones sobre la BD
import { set, get } from '../dataDB'

const useIndexedDB = (key, initialState) => {
    const [item, setItem] = useState(initialState)
    useEffect(() => {
        get(key).then(value => value === undefined || setItem(value))
    }, [key])

    return [
        item,
        value => {
            setItem(value)
            return set(key, value)
        },
    ]
}

export default useIndexedDB