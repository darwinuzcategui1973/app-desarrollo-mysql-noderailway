import express from 'express';
import cors from 'cors';
import {pool} from "./db.js";
import { PORT,www } from "./config.js";


const app = express();
//const cors = require('cors');

const corsOptions = {
	origin: '*',"origin": '*',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    "Access-Control-Allow-Methods": 'GET, POST, OPTIONS, PUT, DELETE',
    'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
    "methods": "GET,PUT,POST",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
};



app.use(express.static(www));
app.use(cors(corsOptions));
console.log(`serving ${www}`);
/*
app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: www });
});
*/
//ruta principal
app.get('/',(req,res)=>{
    res.send("Bienvenido al Servidor")
})
app.get('/lista', async (req,res)=>{
    const [fila]  = await pool.query('SELECT * from users');
    console.log(fila)
    //res.send("hola es ping")
    res.json(fila)
})

//ruta para consultar mysql
app.get('/ping', async (req,res)=>{
    const [result]  = await pool.query('SELECT "hola darwin" as RESULT;');
    console.log(result[0])
    //res.send("hola es ping")
    res.json(result[0])
})

app.get('/create/:nombre', async (req,res)=>{
    let nombre = req.params.nombre|| "";
    let consulta = 'SELECT "no se incluyo nombre" as RESULT;'
    let result  = "No se Incluyo Usuario"
    if (nombre.length>2 && nombre.length<35 ) {
         consulta = `INSERT INTO users(nombre) VALUES("${nombre}")`;
         result  = await pool.query(consulta)
    }

    
    res.json(result)
    console.log(result)
})


//app.listen(port, () => console.log(`listening on http://localhost:${port}`));
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
