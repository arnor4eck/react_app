import { useState, useEffect, useCallback } from 'react';

function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = useCallback(async (abortController) => { // Функция для выполнения запроса
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url, {
                ...options,
                signal: abortController?.signal
            });

            if (!response.ok) 
                throw new Error(`HTTP error! status: ${response.status}`);
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            if (err.name !== 'AbortError') // Игнорируем ошибки отмены запроса
                setError(err.message);
            
        } finally {
            setLoading(false);
        }
    }, [url]); // Только url как зависимость

    useEffect(() => {     // Выполняем запрос при изменении URL
        const abortController = new AbortController();
        
        if (url) // Выполняем запрос только если URL существует
            fetchData(abortController);
        
        return () => { // Функция очистки - отменяем запрос при размонтировании
            abortController.abort();
        };
    }, [url, fetchData]); // fetchData стабильна благодаря useCallback

    const refetch = useCallback(() => { // Функция для повторного выполнения запроса
        const abortController = new AbortController();
        fetchData(abortController);

        return () => abortController.abort();
        }, [fetchData]);
    
    return { data, loading, error, refetch };
}
export default useApi;
