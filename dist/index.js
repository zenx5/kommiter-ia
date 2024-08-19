var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import process from "node:process";
import { createModel, generateCommitMessage, setGlobal, setPath } from "./commands";
import { readTerminal } from "./terminal";
import { commit, push } from "./git-command";
import { listModels } from "./ia-action";
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var models, arg, ACTIONS, _a, message, code, response, e_1, indexProvider, provider, messageModels, indexModel, key, isGlobal, model, path, path_1, models_1, messageModels, indexModel, model, models_2, messageModels, indexModel, model;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    models = {
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
                    };
                    arg = process.argv.slice(2);
                    ACTIONS = {
                        GENERATE: arg.length === 0 || arg.includes('-y') || arg.includes('-p'),
                        SET_KEY: arg.includes('--set-key'),
                        SELECT_MODEL: arg.includes('--select-model'),
                        SELECT_GLOBAL: arg.includes('--select-global'),
                    };
                    if (!ACTIONS.GENERATE) return [3 /*break*/, 11];
                    return [4 /*yield*/, generateCommitMessage()];
                case 1:
                    _a = _b.sent(), message = _a.message, code = _a.code;
                    if (!(code === 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, readTerminal("\u00BFDesea hacer commit con este mensaje?\n[green]\"".concat(message, "\"[/green]\n\n 1) Hacer commit\n 2) Hacer commit y push\n 3) Cancelar\n Resp: "))];
                case 2:
                    response = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 9, , 10]);
                    if (!(response === "1")) return [3 /*break*/, 5];
                    return [4 /*yield*/, commit(message)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 5:
                    if (!(response === "2")) return [3 /*break*/, 8];
                    return [4 /*yield*/, commit(message)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, push()];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_1 = _b.sent();
                    console.log(e_1);
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 28];
                case 11:
                    if (!ACTIONS.SET_KEY) return [3 /*break*/, 19];
                    return [4 /*yield*/, readTerminal("Seleccion proveedor de IA: \n 1) Google\n 2) OpenAI\n 0) Cancelar\n Resp: ")];
                case 12:
                    indexProvider = _b.sent();
                    if (indexProvider === "0")
                        process.exit(0);
                    provider = indexProvider === "1" ? "google" : "openai";
                    messageModels = models[provider].reduce(function (acc, model, index) {
                        return __spreadArray(__spreadArray([], acc, true), [" ".concat(index + 1, ") ").concat(model, "\n")], false);
                    }, []).join("");
                    return [4 /*yield*/, readTerminal("Selecciona modelo de ".concat(provider, ":\n").concat(messageModels, " 0) Cancelar\n Resp: "))];
                case 13:
                    indexModel = _b.sent();
                    if (indexModel === "0")
                        process.exit(0);
                    return [4 /*yield*/, readTerminal("Ingresa tu clave de API: ")];
                case 14:
                    key = _b.sent();
                    return [4 /*yield*/, readTerminal("Scope de la Key:\n 1) Global\n 2) Carpeta actual\n 0) Cancelar\n Resp: ")];
                case 15:
                    isGlobal = _b.sent();
                    if (isGlobal === "0")
                        process.exit(0);
                    return [4 /*yield*/, createModel(models[provider][parseInt(indexModel) - 1], provider, key, isGlobal === "1")];
                case 16:
                    model = _b.sent();
                    if (!(isGlobal !== "1")) return [3 /*break*/, 18];
                    path = process.cwd();
                    return [4 /*yield*/, setPath(model.id, path)];
                case 17:
                    _b.sent();
                    _b.label = 18;
                case 18: return [3 /*break*/, 28];
                case 19:
                    if (!ACTIONS.SELECT_MODEL) return [3 /*break*/, 23];
                    path_1 = process.cwd();
                    return [4 /*yield*/, listModels({ directory: true })];
                case 20:
                    models_1 = _b.sent();
                    messageModels = models_1.reduce(function (acc, model, index) {
                        var _a;
                        var directory = (_a = model.directory) === null || _a === void 0 ? void 0 : _a.find(function (dir) { return dir.path === path_1; });
                        if (!directory)
                            return __spreadArray(__spreadArray([], acc, true), [" ".concat(index + 1, ") ").concat(model.name, "\n")], false);
                        return __spreadArray(__spreadArray([], acc, true), [" ".concat(index + 1, ") ").concat(model.name, " (current)\n")], false);
                    }, []).join("");
                    return [4 /*yield*/, readTerminal("Selecciona modelo:\n".concat(messageModels, " 0) Cancelar\n Resp: "))];
                case 21:
                    indexModel = _b.sent();
                    if (indexModel === "0")
                        process.exit(0);
                    model = models_1[parseInt(indexModel) - 1];
                    return [4 /*yield*/, setPath(model.id, path_1)];
                case 22:
                    _b.sent();
                    return [3 /*break*/, 28];
                case 23:
                    if (!ACTIONS.SELECT_GLOBAL) return [3 /*break*/, 27];
                    return [4 /*yield*/, listModels()];
                case 24:
                    models_2 = _b.sent();
                    messageModels = models_2.reduce(function (acc, model, index) {
                        return __spreadArray(__spreadArray([], acc, true), [" ".concat(index + 1, ") ").concat(model.name, " ").concat(model.isGlobal && '(Global)', "\n")], false);
                    }, []).join("");
                    return [4 /*yield*/, readTerminal("Selecciona modelo:\n".concat(messageModels, " 0) Cancelar\n Resp: "))];
                case 25:
                    indexModel = _b.sent();
                    if (indexModel === "0")
                        process.exit(0);
                    model = models_2[parseInt(indexModel) - 1];
                    return [4 /*yield*/, setGlobal(model.id)];
                case 26:
                    _b.sent();
                    return [3 /*break*/, 28];
                case 27:
                    console.log("Invalid command");
                    process.exit(1);
                    _b.label = 28;
                case 28:
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
})();
