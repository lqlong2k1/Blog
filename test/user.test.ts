//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const should = chai.should();
chai.use(chaiHttp);

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
            chai.request(server)
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