import { useEffect, useRef, useState } from "react";
import useApi from "../../components/api/useApi";
import Book from "./Book";
import './Book.css'
import './BookList.css'

export default function BookListSearch(){
      //const { data: books, loading, error, refetch } = useApi('https://openlibrary.org/people/mekBot/books/want-to-read.json');
    // the+lord+of+the+rings
    
    const [books, setBooks] = useState([]);
    const [searchBook, setSearchBook] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);
    
    const searchBooks = async (query) => { // функция для поиска 
        if (abortControllerRef.current) 
            abortControllerRef.current.abort();
        

        // Создаем новый AbortController для текущего запроса
        abortControllerRef.current = new AbortController();
        try {
            setLoading(true);
            setError(null);
        
            if (!query.trim()) {
                setProducts([]);
                setLoading(false);
                return;
            }

            const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
            { signal: abortControllerRef.current.signal }
            );

            if (!response.ok) 
                throw new Error(`Ошибка HTTP: ${response.status}`);
            
            const data = await response.json();
            setBooks(data.docs || []);
        } catch (err) {
            if (err.name !== 'AbortError') { // Игнорируем ошибки отмены запроса
                setError(err.message);
                console.error('Ошибка при поиске:', err);
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleSearchChange = (e) => { // Обработчик изменения поискового запроса
        const value = e.target.value;
        setSearchBook(value);
        
        if (searchTimeoutRef.current) { // Очищаем предыдущий таймер
            clearTimeout(searchTimeoutRef.current);
        }
        
        searchTimeoutRef.current = setTimeout(() => { // Устанавливаем новый таймер для debounce (500ms)
            searchBooks(value);
        }, 500);
    };
    
    useEffect(() => { // Очистка при размонтировании компонента
        return () => {
            if (searchTimeoutRef.current) 
                clearTimeout(searchTimeoutRef.current);
            
            if (abortControllerRef.current) 
                abortControllerRef.current.abort();
        };
    }, []);


      if(loading){
        return (
            <div className="loading">
                <h1>Загрузка...</h1>
            </div>
        )
      }else if (error) {
        return (
            <div className="errors">
                <h2>Ошибка при загрузке.</h2>
                <p>{error}</p>
                {searchBook.length < 3 && <p>Посиковой запрос должен состоять не менее чем из 3 символов</p>}
                <button onClick={() => {setError(null); setSearchBook(''); setBooks([])}}>Попробовать еще раз</button>
            </div>
        );
    }else{
        return (
            <div>
                <div className="main-title">
                    <div>
                        <h1>Список полезных книг</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Введите название книги..."
                            value={searchBook}
                            onChange={handleSearchChange}
                            className="search-input"
                            minLength={2}
                        />
                    </div>
                </div>
                { books?.length != 0 ? <div className="books-list">
                    {books.map((book, index) => {
                        console.log(book);
                        return <Book book={book} key={index} />
                    })} </div> : <div className="loading">Ничего не найдено</div> 
                }
            </div>
        )
    }
}