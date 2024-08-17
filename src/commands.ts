import { PrismaClient } from "@prisma/client"
import { createText, getModel } from "./ia-action"
import { getLastChanges } from "./git-command"

const prisma = new PrismaClient()

export const generateCommitMessage = async () => {
    const modelData = await getModelAvailable()
    if( !modelData ) {
        console.log("Model not found")
        return
    }
    const model = await getModel(modelData)
    const lastChanges = getLastChanges()
    const response = await createText(model, `genera un mensaje de commit para los siguientes cambios:\n${lastChanges}`)
    console.log( response )
}

const getModelAvailable = async () => {
    const currentPath = process.cwd()
    const directories = await prisma.directory.findMany()
    const currentDirectory = directories.find( directory => directory.path === currentPath )
    if( !currentDirectory ) {
        const [model] = await prisma.model.findMany({
            where: {
                isGlobal: true
            }
        })
        return model
    }
    return await prisma.model.findUnique({
        where: {
            id: currentDirectory.modelId
        }
    })
}