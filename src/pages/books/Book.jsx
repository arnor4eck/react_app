import './Book.css'

export default function Book({ book }) {
    return (
        <div className="book">
            <div className="title">{book.title || 'Без названия'}</div>
            <div className="authors">
                {book.author_names?.map((authorName, index) => (
                    <div key={index} className="author">{authorName}</div>
                )) || <div className="author">{book.author_name}</div>}
            </div>
            <div className="published">{book.first_publish_year || 'Год не указан'}</div>
        </div>
    );
}