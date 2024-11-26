import { cleanTerminal, readTerminal, writeTerminal } from "./terminal"
import { createCommitMessageFile, createModel, deleteCommitMessageFile, generateCommitMessage, openEditor, readCommitMessageFile, setGlobal, setPath } from "./commands"
import { commit, push } from "./git-command"
import { CANCEL, COMMIT_AND_PUSH, EDIT_MESSAGE, NOT_ERROR, NOT_GLOBAL, ONLY_COMMIT, YES_GLOBAL, models, optionsResponse } from "./constants"
import { listModels } from "./ia-action"

export const generateAction = async ( defaultMessage:string|null = null ) => {
    const { message:messageNotFormat, code } = await generateCommitMessage(defaultMessage)
    const message = new String(messageNotFormat).replace(/`/gm, "'").replace(/"/gm, "'")
    if( code===NOT_ERROR ) {
        const response = await readTerminal(`¿Desea hacer commit con este mensaje?\n[green]${message}[/green]\n\n ${optionsResponse.join("\n ")} Resp: `) as string
        try{
            if( response === ONLY_COMMIT ) {
                const { error:errorCommit, message:messageCommit } = await commit(message as string) as { error:boolean, message:any }
                if( errorCommit ) throw new Error(messageCommit)
            }
            else if( response === COMMIT_AND_PUSH ) {
                const { error:errorCommit, message:messageCommit } = await commit(message as string) as { error:boolean, message:any }
                if( errorCommit ) throw new Error(messageCommit)
                const { error:errorPush, message:messagePush } = await push() as { error:boolean, message:any }
                if( errorPush ) throw new Error(messagePush)
            }
            else if( response === EDIT_MESSAGE ) {
                const filePath = await createCommitMessageFile(message as string)
                const result = await openEditor(filePath)
                if( !result ) throw new Error("Error al abrir al editar el commit")
                const newMessage = await readCommitMessageFile(filePath)
                await deleteCommitMessageFile(filePath)
                cleanTerminal()
                await generateAction(newMessage)
            }
            else{
                cleanTerminal()
                process.exit(0)
            }
            cleanTerminal()
            writeTerminal("Commit realizado con éxito.\n")
        } catch(e) {
            cleanTerminal()
            if( e instanceof Error ) writeTerminal(`Error al realizar el commit: ${e.message}\n`)
            else writeTerminal(e as string)
        }
    }
    else{
        console.log(message)
    }
}

export const setKey = async () => {
    const modelOptions = Object.keys(models).map( (model, index) => ` ${index+1}) ${model}\n`).join("")
    const indexProvider = await readTerminal(`Seleccion proveedor de IA: \n${modelOptions} 0) Cancelar\n Resp: `)
    if( indexProvider === CANCEL ) process.exit(0)
    const provider = Object.keys(models)[ Number(indexProvider) - 1] as keyof typeof models
    const messageModels = models[ provider ].reduce((acc:string[], model:string, index:number) => {
        return [...acc, ` ${index+1}) ${model}\n`]
    },[]).join("")
    const indexModel = await readTerminal(`Selecciona modelo de ${provider}:\n${messageModels} 0) Cancelar\n Resp: `) as string
    if( indexModel === CANCEL ) process.exit(0)
    const key = await readTerminal("Ingresa tu clave de API: ") as string
    const isGlobal = await readTerminal("Scope de la Key:\n 1) Global\n 2) Carpeta actual\n 0) Cancelar\n Resp: ") as string
    if( isGlobal === NOT_GLOBAL ) process.exit(0)
    const model = await createModel(models[provider][ parseInt(indexModel)-1 ], provider, key, isGlobal===YES_GLOBAL)
    if( isGlobal!==YES_GLOBAL ) {
        const path = process.cwd()
        await setPath(model.id, path)
    }
}


export const selectModel = async () => {
    const path = process.cwd()
    const models = await listModels({ directory:true } as { directory: boolean })
    const messageModels = models.reduce((acc:string[], model:any, index:number) => {
        const directory = model.directory?.find( (dir:{ path:string }) => dir.path === path )
        if( !directory ) return [...acc, ` ${index+1}) ${model.name}\n`]
        return [...acc, ` ${index+1}) ${model.name} (current)\n`]
    },[]).join("")
    const indexModel = await readTerminal(`Selecciona modelo:\n${messageModels} 0) Cancelar\n Resp: `) as string
    if( indexModel === CANCEL ) process.exit(0)
    const model = models[ parseInt(indexModel) - 1 ]
    await setPath(model.id, path)
}

export const selectGlobal = async () => {
    const models = await listModels()
    const messageModels = models.reduce((acc:string[], model:any, index:number) => {
        return [...acc, ` ${index+1}) ${model.name} ${model.isGlobal && '(Global)'}\n`]
    },[]).join("")
    const indexModel = await readTerminal(`Selecciona modelo:\n${messageModels} 0) Cancelar\n Resp: `) as string
    if( indexModel === CANCEL ) process.exit(0)
    const model = models[ parseInt(indexModel) - 1 ]
    await setGlobal(model.id)
}

export const renderListModels = async () => {
    const models = await listModels()
    const messageModels = models.reduce((acc:string[], model:any, index:number) => {
        return [...acc, ` ${index+1}) ${model.name} ${model.isGlobal && '(Global)'}\n`]
    },[]).join("")
    writeTerminal(` Modelos:\n${messageModels}`)
}

export const help = async () => {
    writeTerminal(`\n  Uso: kommit [opciones]\n  Usa este comando para generar commits para tus cambios en Git\n\n  Opciones:\n    --help
        Muestra esta ayuda\n    --list
        Muestra los modelos disponibles\n    --set-key
        Configura una clave de API\n    --select-model
        Selecciona un modelo para la carpeta actual\n    --select-global
        Selecciona un modelo global\n`)

}