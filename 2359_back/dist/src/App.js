"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/welcome', (req, res, next) => {
    res.send('welcome!');
});
app.listen('1234', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    firstlogin: {
        type: Boolean,
        default: false,
    },
    createoption: {
        type: new mongoose_1.Schema({
            answer: Boolean,
            todo: Boolean,
            diary: Boolean,
            emotion: Boolean,
            account: Boolean,
        }),
        required: false,
        default: {
            answer: false,
            todo: false,
            diary: false,
            emotion: false,
            account: false,
        },
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
run().catch((err) => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // 4. Connect to MongoDB
        yield (0, mongoose_1.connect)('mongodb://localhost:27017/test');
        const user = new User({
            email: 'abc@cc.com',
            password: 'abc123',
            nickname: 'st',
        });
        yield user.save();
        console.log(user);
    });
}
