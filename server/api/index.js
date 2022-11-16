import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

export default {
    path: '/api',
    handler: app
}

app.post('/word', async (req, res) => {
    const result = await prisma.word.create({
        data: {
            polishName: req.body.polishName,
            deutschName: req.body.deutschName
        }
    })
    res.json(result)
})

app.get('/word', async (req, res) => {
    const words = await prisma.word.findMany()
    res.json(words)
})

app.get('filterWords', async (req, res) => {
    const { searchString } = req.query
    const words = await prisma.word.findMany({
        where: {
            OR: [
                {
                    polishName: {
                        contains: searchString,
                    }
                },
                {
                    deutschName: {
                        contains: searchString
                    }
                }
            ]
        }
    })
    res.send(words)
})