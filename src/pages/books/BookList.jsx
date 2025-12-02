import useApi from "../../components/api/useApi";
import Book from "./Book";
import './Book.css'
import './BookList.css'

export default function BookList(){
      const { data: books, loading, error, refetch } = useApi('https://openlibrary.org/people/mekBot/books/want-to-read.json');

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
                <button onClick={refetch}>Попробовать снова</button>
            </div>
        );
    }else{
        return (
            <div>
                <div className="main-title">
                    <div>
                        <h1>Список полезных книг</h1>
                    </div>
                </div>
                <div className="books-list">
                    {books?.reading_log_entries.map((book, index) => {
                        return <Book book={book.work} key={index} />
                    })}
                </div>
            </div>
        )
    }
}