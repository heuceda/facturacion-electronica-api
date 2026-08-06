import { jsonresponse } from "../helpers/json_response.js"

//Siempre usar despues de isAuth 
export const isAdmin = (req, res, next) => {

    if(req.user?.role === 'ADMIN'){
        return next()
    }

    return res.status(403).json(jsonresponse({
        status: 403,
        message: "No tiene permisos para acceder a este recurso, solo administradores",
        data: null
    }))
}