import express from 'express'
import cors from 'cors'
import prodRoutes from './routes/produtos.js'
import clieRoutes from './routes/clientes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", clieRoutes)
app.use("/produtos", prodRoutes)

app.listen(8800)