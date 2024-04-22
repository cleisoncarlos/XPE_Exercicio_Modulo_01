
import express from 'express'
import carsRouter from './router/cars.router.js';

const app = express()
const port = 3000

app.use(express.json())
app.use("/marcas", carsRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

