import process from "node:process";
import { createModel, generateCommitMessage, setGlobal, setPath } from "./commands";
import { readTerminal } from "./terminal";
import { commit, push } from "./git-command";
import { listModels } from "./ia-action";


(async function(){
    const models = {
        "google": [
            "models/gemini-1.5-flash-latest",
            "models/gemini-1.5-pro-latest"
        ],
        "openai": [
            "gpt-4",
            "gpt-4-turbo",
            "gpt-4o-mini",
            "gpt-4o"
        ]
    }


    const arg = process.argv.slice(2)
    const ACTIONS = {
        GENERATE: arg.length === 0 || arg.includes('-y') || arg.includes('-p'),
        SET_KEY: arg.includes('--set-key'),
        SELECT_MODEL: arg.includes('--select-model'),
        SELECT_GLOBAL: arg.includes('--select-global'),
    }


    if( ACTIONS.GENERATE ) {
        const { message, code } = await generateCommitMessage()
        if( code===0 ) {
            const response = await readTerminal(`¿Desea hacer commit con este mensaje?\n[green]"${message}"[/green]\n\n 1) Hacer commit\n 2) Hacer commit y push\n 3) Cancelar\n Resp: `) as string
            try{
                if( response === "1" ) {
                    await commit(message as string)
                }
                else if( response === "2" ) {
                    await commit(message as string)
                    await push()
                }
            } catch(e) {
                console.log(e)
            }
        }
        else{
            console.log(message)
        }
    }
    else if( ACTIONS.SET_KEY ) {
        const indexProvider = await readTerminal("Seleccion proveedor de IA: \n 1) Google\n 2) OpenAI\n 0) Cancelar\n Resp: ")
        if( indexProvider === "0" ) process.exit(0)
        const provider = indexProvider === "1" ? "google" : "openai"
        const messageModels = models[ provider ].reduce((acc:string[], model:string, index:number) => {
            return [...acc, ` ${index+1}) ${model}\n`]
        },[]).join("")
        const indexModel = await readTerminal(`Selecciona modelo de ${provider}:\n${messageModels} 0) Cancelar\n Resp: `) as string
        if( indexModel === "0" ) process.exit(0)
        const key = await readTerminal("Ingresa tu clave de API: ") as string
        const isGlobal = await readTerminal("Scope de la Key:\n 1) Global\n 2) Carpeta actual\n 0) Cancelar\n Resp: ") as string
        if( isGlobal === "0" ) process.exit(0)
        const model = await createModel(models[provider][ parseInt(indexModel)-1 ], provider, key, isGlobal==="1")
        if( isGlobal!=="1" ) {
            const path = process.cwd()
            await setPath(model.id, path)
        }
    }
    else if( ACTIONS.SELECT_MODEL ) {
        const path = process.cwd()
        const models = await listModels({ directory:true } as { directory: boolean })
        const messageModels = models.reduce((acc:string[], model:any, index:number) => {
            const directory = model.directory?.find( (dir:{ path:string }) => dir.path === path )
            if( !directory ) return [...acc, ` ${index+1}) ${model.name}\n`]
            return [...acc, ` ${index+1}) ${model.name} (current)\n`]
        },[]).join("")
        const indexModel = await readTerminal(`Selecciona modelo:\n${messageModels} 0) Cancelar\n Resp: `) as string
        if( indexModel === "0" ) process.exit(0)
        const model = models[ parseInt(indexModel) - 1 ]
        await setPath(model.id, path)
    }
    else if( ACTIONS.SELECT_GLOBAL ) {
        const models = await listModels()
        const messageModels = models.reduce((acc:string[], model:any, index:number) => {
            return [...acc, ` ${index+1}) ${model.name} ${model.isGlobal && '(Global)'}\n`]
        },[]).join("")
        const indexModel = await readTerminal(`Selecciona modelo:\n${messageModels} 0) Cancelar\n Resp: `) as string
        if( indexModel === "0" ) process.exit(0)
        const model = models[ parseInt(indexModel) - 1 ]
        await setGlobal(model.id)
    }
    else {
        console.log("Invalid command")
        process.exit(1)
    }
    process.exit(0)
})()