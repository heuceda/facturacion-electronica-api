import { ValidacionSchema } from "../schemas/Auth.schema.js"
import jwt from "jsonwebtoken"
import { jsonresponse } from "../helpers/json_response.js"
import UserModel from "../models/User.model.js"
import argon2 from "argon2" 

export const login = async (req, res) => {

    const {success, data, error } = ValidacionSchema(req.body)

    if(!success){
        return res.status(400).json(jsonresponse({
            status: 400,
            message: "No paso las validaciones",
            data: JSON.parse(error.message)
        }))
    }

    try{

        const user = await UserModel.findByEmail(data.email)

        if(!user){
            return res.status(404).json(jsonresponse({
                status: 404,
                message: "Las credenciales no son correctas",
                data: null
            }))
        }

        const isValid = await argon2.verify(data.password, user.password_hash)

        if(!isValid){
            return res.status(401).json(jsonresponse({
                status: 401,
                message: "Las credenciales no son correctas",
                data: null
            }))
        }

        const payload = { id: user.id, name: user.name, email: user.email, role: user.role}

        const token = jwt.sign(payload, process.env.JWT_KEY,
             { expiresIn: "10h" })

        return res.status(200).json(jsonresponse({
            status: 200,
            message: `Bienvenido, ${user.name}`,
            data: { ...payload, name: user.name, token }
            //esta data lo que mostrara es el payload que se le asigno al token, y el token generado
        }))
    

    }catch(e){
        console.log(e)
        return res.status(500).json(jsonresponse({
            status: 500,
            message: "Error interno del servidor",
            data: null
        }))
    }

}
