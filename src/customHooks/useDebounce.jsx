import { useCallback } from "react"

// funzione di debouce standard
function debounce(callback, delay) {
    let timer;

    return (value) => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

export default function useDebounce(callback, delay) {

    const debouncedFunction = useCallback(
        debounce(callback, delay),
        [callback, delay]
    )

    return debouncedFunction
}