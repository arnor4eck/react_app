import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            console.log(item ? JSON.parse(item) : initialValue);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Ошибка чтения из localStorage ключа "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            // Исправлено: используем storedValue, а не value из параметров
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}