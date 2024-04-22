import express from "express"
import { promises as fs } from "fs"

const { readFile } = fs
const router = express.Router()

// caminho do json 
const data = 'C:/Users/Mentor/Desktop/xpeducacao-nodeJs-01/src/data/car-list.json'

router.get("/", async  (_req, res) => {
    try{
        const carList = JSON.parse(await readFile(data))
        res.json(carList)
    } catch(err) {
        res.status(400).send({ error: err.message })
    }    
})

router.get("/maisModelos", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile(data))        
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })        
        carsBrandAndModelsTotal.sort(function(a, b){return b.modelsTotal - a.modelsTotal})
        const filteredMoreModelsOcourrences = carsBrandAndModelsTotal.filter(element => {
            return element.modelsTotal === carsBrandAndModelsTotal[0].modelsTotal
        })
        res.send(filteredMoreModelsOcourrences)        
    } catch(err) {
        res.status(400).send({ error: err.message })
    }
})

router.get("/menosModelos", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile(data))        
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })        
        carsBrandAndModelsTotal.sort(function(a, b){return  a.modelsTotal - b.modelsTotal})
        const filteredLessModelsOcourrences = carsBrandAndModelsTotal.filter(element => {
            return element.modelsTotal === carsBrandAndModelsTotal[0].modelsTotal
        })
        res.send(filteredLessModelsOcourrences)        
    } catch(err) {
        res.status(400).send({ error: err.message })
    }
})

router.get("/listaMaisModelos/:order", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile(data))
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })        
        carsBrandAndModelsTotal.sort(function(a, b){return  b.modelsTotal - a.modelsTotal})
        res.send(carsBrandAndModelsTotal.splice(0, req.params.order))        
    } catch(err) {
        res.status(400).send({ error: err.message })
    }
})

router.get("/listaMenosModelos/:order", async (req, res) => {
    try{
        const carList = JSON.parse(await readFile(data))
        const carsBrandAndModelsTotal = carList.map(element => {
            return { brand: element.brand, modelsTotal: element.models.length}
        })        
        carsBrandAndModelsTotal.sort(function(a, b){return a.modelsTotal - b.modelsTotal})
        res.send(carsBrandAndModelsTotal.splice(0, req.params.order))        
    } catch(err) {
        res.status(400).send({ error: err.message })
    }
})

router.get('/listaModelos/:marca', async (req, res) => {
    try {
        const marca = req.params.marca;
        const rawData = await fs.readFile(data); // Lê o conteúdo do arquivo JSON de forma assíncrona
        const carList = JSON.parse(rawData); // Converte os dados lidos para um objeto JavaScript

        if (!carList.some(carro => carro.brand === marca)) {
            return res.status(404).send({ error: 'Marca não encontrada.' });
        }
        const modelos = carList.find(carro => carro.brand === marca).models; // Encontra os modelos da marca especificada
        res.send(modelos);
    } catch (error) {
        console.error('Erro ao ler arquivo:', error);
        res.status(500).send({ error: 'Erro interno do servidor.' });
    }
});

export default router
