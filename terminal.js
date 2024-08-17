import process from "node:process"

export const readTerminal = async () => {
    const data = await process.stdin.once("data")
    return data.toString().trim()
}

export const writeTerminal = async (message) => {
    await process.stdout.write(message)
}