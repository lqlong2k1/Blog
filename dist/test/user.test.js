"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../index"));
const should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
//Our parent block
describe('Users', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
         * Test the /GET route
         */
    describe('GET /users/', () => {
        it('it should GET all the users', (done) => {
            chai_1.default.request(index_1.default)
                .get('/users/')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(9); // fixme :)
                done();
            });
        });
    });
});
