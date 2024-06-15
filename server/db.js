import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./diaries.db')

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS diaries (
        year INTEGER,
        month INTEGER,
        date INTEGER,
        article TEXT,
        PRIMARY KEY (year, month, date)
    )
    `)

})

export default db;