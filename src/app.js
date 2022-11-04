import express from 'express';
import {pool} from "./db.js";
import { PORT,www } from "./config.js";

const app = express();

app.use(express.static(www));
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

app.get('/create', async (req,res)=>{
    const result  = await pool.query('INSERT INTO users(nombre) VALUES("Darwin Felipe")')
    res.json(result)
    console.log(result)
})


//app.listen(port, () => console.log(`listening on http://localhost:${port}`));
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
