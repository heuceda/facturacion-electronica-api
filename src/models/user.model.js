import { pool } from "../db/db.js"

export default class UserModel {

    static findByEmail= async (email) => {

        const conn = await pool.getConnection()

        try{

            const [rows] = await conn.execute(
                'SELECT id, name, email,  password_hash, role FROM users WHERE email = ?',
                [email]
            )

            return rows[0]

        } catch (e){
            console.log(e)
            throw e
        }finally {
            conn.release()
        }
    }
}