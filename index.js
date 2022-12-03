const express = require("express");
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
    response(200, "API V1 ready to go", "SUCCES", res);
});

app.get("/mahasiswa", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, fields) => {
        if (err) throw err;
        response(200, fields, "asdasdasdasdasdas", res);
    });
});

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim;
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
    db.query(sql, (err, fields) => {
        if (err) throw err;
        response(200, fields, "detail mahasiswa by nim", res);
    });
});

app.post("/mahasiswa", (req, res) => {
    const { nim, nama, jurusan } = req.body;
    const sql = `INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (${nim}, '${nama}', '${jurusan}')`;
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res);
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(200, data, "data added succesfuly", res);
        }
    });
});

app.listen(port, () => {
    console.log(`server is up and running on localhost:${port}`);
});
