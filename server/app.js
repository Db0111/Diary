import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';
import cors from 'cors'


const app = express();
const PORT = 5144;


app.use(cors());
// 
// import apiRouter from 'diary/router';

// import { useLocalStorage } from "../web/src/Storage.jsx";
// import { router } from "../web/src/Router.jsx";
// import { Modal } from "../web/src/Modal.jsx";
// import { DiaryEdit } from "../web/src/DiaryEditPage.jsx";
// import { CalendarPage } from "../web/src/Calendar/CalendarPage.jsx";
// import { Calendar } from "../web/src/Calendar/Calendar.jsx"ㅜㅜ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log('Current directory:', __dirname);
// console.log('Storage.jsx path:', path.join(__dirname, '../src/Storage.jsx'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../web/dist')));

// app.use('/api', apiRouter);
// app.get('/',(req, res) => {
//     res.json("hello server api 입니다");
// })

//diaries 전체 조회
app.get('/api/diaries', async (req, res) => {
    const {year, month, date} = req.query;

    let sql = `SELECT * FROM diaries`;
    if (year || month || date ) {
        sql += " WHERE ";
        year && (sql += `year=?`)
        month && (sql += ` and month=?`)
        date && (sql += ` and date=?`)
    }

    db.all(sql, [year, month, date], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({
                status: 'Error',
                error: err.message
            });
        }
        res.json({
            status: 'OK',
            data: rows
        });
    });
});
// // 개별 일기 조회 (아이디에 따라 조회 -> date 값으로 식별)
// app.get('/api/diaries/', (req, res) => {
//     const { year, month, date } = req.query;
//     const sql = `SELECT * FROM diaries WHERE year=? and month=? and date =?`;
//     db.get(sql, [year, month, date], (err, row) => {
//         if (err) {
//             console.error('Error querying database:', err);
//             return res.status(500).json({
//                 status: 'Error',
//                 error: err.message
//             });
//         }
//         if (!row) {
//             return res.status(404).json({
//                 status: 'Not Found'
//             });
//         }
//         res.json({
//             status: 'OK',
//             data: row
//         });
//     });
// });
//일기 저장
app.post('/api/diaries/', async (req, res) => {
    const {year, month, date} = req.query;
    const {article } = req.body;
    const sql = 'INSERT INTO diaries (year, month, date, article) VALUES (?,?,?,?) ON CONFLICT(year, month, date) DO UPDATE SET article=excluded.article';
    await db.run(sql, [year,month, date, article], function(err) {
        if (err) {
            return res.status(500).json({
                status: 'Error',
                error: err.message
            });
        }
        res.json({
            status: 'OK',
            id: this.lastID
        });
    });
});

// 일기 수정
app.put('/api/diaries/', (req, res) => {
    const { year, month, date } = req.query;
    const { article } = req.body;
    const sql = `UPDATE diaries SET article = ? WHERE year=? and month=? and date = ?`;
    db.run(sql, [article, year,month, date], function(err) {
        if (err) {
            return res.status(500).json({
                status: 'Error',
                error: err.message
            });
        }
        res.json({
            status: 'OK',
            changes: this.changes
        });
    });
});

//일기 삭제
app.delete('/api/diaries/', (req, res) => {
    const { year, month, date } = req.query;
    const sql = `DELETE FROM diaries WHERE year=? AND month=? AND date=?`;
    db.run(sql, [year, month, date], function(err) {
        if (err) {
            return res.status(500).json({
                status: 'Error',
                error: err.message
            });
        }
        res.json({
            status: 'OK',
            changes: this.changes
        });
    });
});


// React Router의 모든 라우트를 처리
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../web/dist', 'index.html'));
});


// app.use((err, req, res, next) => {
//     // todo
// });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});