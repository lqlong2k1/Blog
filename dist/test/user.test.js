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
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../index"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
beforeEach((done) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.users.deleteMany({});
    done();
}));
describe('Users', () => {
    // describe('create new user', () => {
    //     it('it should POST a new user', (done) => {
    //         const user = {
    //             username: 'lanntp12',
    //             password: '123456789',
    //             full_name: 'Nguyen Thi Phuong Lan',
    //             email: 'lanntp12@gmail.com',
    //             phone_number: '011 123 2456',
    //             country: 'Viet Nam',
    //             dob: new Date('2001-08-07')
    //         }
    //         chai.request(server)
    //             .post('/users')
    //             .send(user)
    //             .end((err, res) => {
    //                 console.log("🚀 ~ file: user.test.ts ~ line 31 ~ .end ~ 1", res.status)
    //                 console.log("🚀 ~ file: user.test.ts ~ line 31 ~ .end ~ 2", res.body)
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql('success');
    //                 res.body.should.have.property('username').eql('lanntp12');
    //                 done();
    //             });
    //     });
});
describe('get list users', () => {
    it('it should GET users', (done) => {
        chai_1.default.request(index_1.default)
            .get('/users')
            .end((err, res) => {
            console.log("🚀 ~ file: user.test.ts ~ line 31 ~ .end ~ 1", res.status);
            console.log("🚀 ~ file: user.test.ts ~ line 31 ~ .end ~ 2", res.body);
            res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.should.have.property('status').eql('success');
            // res.body.should.have.property('username').eql('lanntp12');
            done();
        });
    });
});
// })
