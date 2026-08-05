import jwt from "jsonwebtoken"
import { jsonresponse } from "../helpers/json_response.js"

export const isAuth = (req, res, next) => {

    try{

        //Obtener encabezado de autorizacion
        const authHeader = req.headers.authorization

        //validar que exista y venga en formato Bearer token
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json(jsonresponse({
                status: 401,
                message: "No es un token valido",
                data: null
            }))
        }

        //extraer el token del encabezado
        const token = authHeader.split(" ")[1]

        //verificar el token para ver si no a expirado y es valido
        const {id, email, role} = jwt.verify(token, process.env.JWT_KEY)

        //Guardar informacion del usuario en la request
        req.user = {id, email, role}

        //pasar al siguiente middleware o controlador
        next()

    }catch(e){
        return res.status(401).json(jsonresponse({
            status: 401,
            message: "Debe iniciar sesion, Token no valido o expirado",
            data: null
        }))
    }


}