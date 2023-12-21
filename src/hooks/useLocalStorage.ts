import {useEffect, useState} from 'react'

const PREFIX = 'qwirkle-';

export default function useLocalStorage(key: string, initialValue: any) {
    const prefixedkey = PREFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedkey);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(()=> {
        console.log(value)
        if (value !== undefined) {
            localStorage.setItem(prefixedkey, JSON.stringify(value))
        }
    }, [prefixedkey, value])

    return [value, setValue]
}