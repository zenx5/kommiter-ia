import { PrismaClient } from "@prisma/client"
import { createText, getModel } from "./ia-action"
import { getLastChanges } from "./git-command"
import { prefix } from "./constants"

const prisma = new PrismaClient()

export const generateCommitMessage = async () => {
    const modelData = await getModelAvailable()
    if( !modelData ) {
        return {
            code: 1,
            message: "Model not found"
        }
    }
    const model = await getModel(modelData)
    const { error, message }= await getLastChanges() as { error:boolean, message:string }
    if( error ) {
        return {
            code: 1,
            message
        }
    }
    const response = await createText(model, `genera un mensaje de commit para los siguientes cambios:\n${message.replace(/`/g,"'")}, limita la respuesta a solo describir los cambios y toma en consideracion estas convenciones de prefijos para el commit ${prefix.join(", ")}.`)
    return {
        code: 0,
        message: response.text
    }
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

export const createModel = async (name:string, provider:string, key:string, isGlobal:boolean) => {
    const [model] = await prisma.model.findMany({
        where:{
            name,
            provider,
            key
        }
    })
    if( model ) {
        if( model.isGlobal===isGlobal ) return model
        return await setGlobal(model.id)
    }
    const newModel = await prisma.model.create({
        data: {
            name,
            provider,
            key,
            isGlobal:false
        }
    })
    if( isGlobal ) await setGlobal(newModel.id)
    return newModel
}

export const setGlobal = async (modelId:number) => {
    await prisma.model.updateMany({
        where: {
            isGlobal: true
        },
        data: {
            isGlobal: false
        }
    })
    return await prisma.model.update({
        where: {
            id: modelId
        },
        data: {
            isGlobal: true
        }
    })
}

export const setPath = async (modelId:number, path:string) => {
    const [directory] = await prisma.directory.findMany({
        where: {
            path
        }
    })
    if( directory ) {
        return await prisma.directory.update({
            where: {
                id: directory.id
            },
            data: {
                modelId
            }
        })
    }
    return await prisma.directory.create({
        data: {
            path,
            modelId
        }
    })
}