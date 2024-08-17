// import { generateText, LanguageModel } from "ai";
// // import { createOpenAI } from "@ai-sdk/openai"
// // import { google } from "@ai-sdk/google"
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

// export const createText = async (model:LanguageModel, prompt:string) => {
//     return await generateText({
//         model,
//         prompt
//     })
// }

// export const setModel = (nameModel:string, key:string) => {

// }


export const getModel = async (typeModel:string) => {
    const result = await prisma.model.findUnique({
        where:{
            name:typeModel
        } as Prisma.ModelWhereUniqueInput,
        select:{
            name: true,
            type: true,
            description: true,
            key: true
        }
    })


    // const apiKey = ''
    // return createOpenAI({
    //     apiKey
    // })
    return result

}