import { generateText, LanguageModel } from "ai";
import { createOpenAI } from "@ai-sdk/openai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

export const createText = async (model:any, prompt:string) => {
    return await generateText({
        model,
        prompt
    })
}

export const listModels = async () => {
    return await prisma.model.findMany()
}

export const searchModel = async (name:string) => {
    return await prisma.model.findMany({
        where:{
            name
        }
    })
}

export const setModel = async (name:string, provider:string, key:string) => {
    return await prisma.model.create({
        data: {
            name,
            provider,
            key,
            isGlobal:false,
            Directory: [] as Prisma.DirectoryUncheckedCreateNestedManyWithoutModelInput | Prisma.DirectoryCreateNestedManyWithoutModelInput | undefined
        }
    })
}


export const getModel = async (model:any) => {
    if( model.provider === "openai" ) {
        return createOpenAI({
            apiKey: model.key
        })
    }
    else if( model.provider === "google" ) {
        createGoogleGenerativeAI({
            apiKey: model.key
        })
    }
}