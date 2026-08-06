import express from 'express'
import 'dotenv/config'
import authrouter from './src/routes/auth.routes.js'
import Productrouter from './src/routes/product.routes.js'
import invoicerouter from './src/routes/invoice.routes.js'

const app = express ()
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API de Facturacion funcionando correctamente.')
} ) 

app.use('api/v1/auth', authrouter)
app.use('api/v1/product', Productrouter)
app.use('api/v1/invoices', invoicerouter)

app.listen(PORT, () => {
  console.log(`Servidor en marcha en: http://localhost:${PORT}`)
});

