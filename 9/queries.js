// queries.js
const authorQueries = {
  getAllAuthors: 'SELECT * FROM autores;',
  getAuthorById: 'SELECT * FROM autores WHERE id_autor = ?;',
  getAuthorsWithMostBooks: 'SELECT a.nombre, a.apellido, COUNT(l.id_libro) AS total_libros FROM autores AS a INNER JOIN libros AS l ON a.id_autor = l.id_autor GROUP BY a.id_autor HAVING total_libros > 1 ORDER BY total_libros DESC;'
};

const bookQueries = {
  getAllBooks: 'SELECT titulo, año_publicacion FROM libros;',
  getMostBorrowedBooks: 'SELECT l.titulo, COUNT(p.id_prestamo) AS total_prestamos FROM libros AS l INNER JOIN prestamos AS p ON l.id_libro = p.id_libro GROUP BY l.titulo ORDER BY total_prestamos DESC LIMIT 5;'
};

const readerQueries = {
    getAllReaders: 'SELECT * FROM lectores;'
};

module.exports = {
  authorQueries,
  bookQueries,
  readerQueries
};