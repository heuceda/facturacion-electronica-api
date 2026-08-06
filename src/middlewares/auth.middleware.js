
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    req.user = { id: 1, email: 'admin@facturacion.com', role: 'ADMIN' };
    return next();
  }

  req.user = { id: 1, email: 'admin@facturacion.com', role: 'ADMIN' };
  next();
};

// Middleware para restringir acceso por roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado: No tienes permisos para realizar esta acción'
      });
    }
    next();
  };
};
