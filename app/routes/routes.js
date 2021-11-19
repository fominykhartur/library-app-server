const pool = require('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Сервер 2.0 библиотеки запущен'
        });
    });

    app.get('/books', (request, response) => {
        pool.query('select * from "library-db".books', (error, result) => {
            if (error) throw error;
            response.send(result.rows);
        });
    });

    app.get('/ping', (request, response) => {
        response.send({
            message: 'pong'
        });
    });

    app.get('/categories', (request, response) => {
        pool.query('select * from "library-db".categories', (error, result) => {
            if (error) throw error;
            response.send(result.rows);
        });
    });

    app.post('/updateStatus', (request, response) => {
        console.log(request.body);
        pool.query(`UPDATE "library-db".books SET status=${request.body.status} WHERE id = ${request.body.id};`, (error, result) => {
            if (error) throw error;
            response.send('Updated');
        });
    });

    app.post('/addBook', (request, response) => {
        console.log(request.body);
        // INSERT INTO books (`categoria`, `subcycle`, `author`, `name`, `status`) VALUES ('1', 'Снайпер', 'Дмитрий Силлов', 'Закон снайпер', '1');
        pool.query(`INSERT INTO "library-db".books (categoria, subcycle, author, name, status) VALUES (${request.body.categoria}, '${request.body.cycle}', '${request.body.author}', '${request.body.name}', '0')`, (error, result) => {
            if (error) throw error;
            response.send('Updated');
        });
    });
}

module.exports = router;