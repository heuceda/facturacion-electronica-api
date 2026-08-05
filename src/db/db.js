import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection = null;

try {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log("Conexión a la base de datos establecida.");

} catch (error) {
    console.log("Base de datos no disponible. Continuando sin conexión.");
}

export default connection;