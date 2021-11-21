const pool = require('../data/config');
const Excel = require('exceljs');


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

    app.get('/exportBooks', (request, response) => {
        pool.query('select subcycle, author, books.name, status, categories.name as categorie_name \
            from "library-db".books, "library-db".categories \
            where cast ("library-db".books.categoria as numeric) = "library-db".categories.id', (error, result) => {
                if (error) throw error;
                const categories = new Set(result.rows.map(item => item.categorie_name));
                var workbook = new Excel.Workbook();
                for (categorie of categories.values()){
                    var worksheet = workbook.addWorksheet(categorie);
                    worksheet.columns = [
                    { header: 'Подцикл', key: 'subcycle' },
                    { header: 'Автор', key: 'author' },
                    { header: 'Название', key: 'name' },
                    { header: 'Статус', key: 'status' },];
                    result.rows.map(item => {
                        if (item.categorie_name !== categorie){
                            return;
                        }
                        worksheet.addRow({ subcycle: item.subcycle, 
                                           author: item.author, 
                                           name: item.name,
                                           status: item.status === 1 ? '+' : '' });
                    })
                }
                response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                response.setHeader("Content-Disposition", "attachment; filename=" + "Books.xlsx");
                workbook.xlsx.write(response)
                .then(function (data) {
                    response.end();
                    console.log('БД экспортирована удачно');
                });
                
            })
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