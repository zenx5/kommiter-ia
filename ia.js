import { generateText } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"

export const generateText = async (model, prompt) => {
    return await generateText({
        model,
        prompt
    })
}

export const setModel = (nameModel, key) => {

}


export const getModel = (nameModel) => {
    const apiKey = ''
    return createOpenAI({
        apiKey
    })

}