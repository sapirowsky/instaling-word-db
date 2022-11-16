import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
    const body = useBody(event)

    const { polishName, deutschName } = await body

    const newWord = await prisma.word.create({
        data: {
            polishName,
            deutschName
        }
    })

    return newWord
})