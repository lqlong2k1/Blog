process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import prisma from '../utils/prisma';

const should = chai.should();

chai.use(chaiHttp);

beforeEach(async (done) => {
    await prisma.users.deleteMany({})
    done();
});
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

        chai.request(server)
            .get('/users')
            .end((err, res) => {
                console.log("🚀 ~ file: user.test.ts ~ line 31 ~ .end ~ 1", res.status)
                console.log("🚀 ~ file: user.test.ts ~ line 31 ~ .end ~ 2", res.body)
                res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.should.have.property('status').eql('success');
                // res.body.should.have.property('username').eql('lanntp12');
                done();
            });
    });
});

// })