const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Task API', function () {


    //insert item
    it('Insert Item', function (done) {
        const newItem = {
            name: 'Test Item',
            description: 'Test item description',
            price: 10.99,
            category: 'Test Category'
        };

        chai
            .request(server)
            .post('/items/insert')
            .send(newItem)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'Item created successfully');
                expect(res.body).to.have.property('status', 201);
                expect(res.body).to.have.property('data').that.is.an('object');
                done();
            });
    });


    //update item 
    it('Update Item', function (done) {
        const itemId = '646c9cd82a80c39a7e22da9b';
        const updatedItem = {
            name: 'Updated Item',
            description: 'Updated item description',
            price: '19.99',
            category: 'Updated Category'
        };

        chai
            .request(server)
            .put('/items/update/' + itemId)
            .send(updatedItem)
            .end(function (err, res) {
                console.log("resss", res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Item update successfully');
                expect(res.body).to.have.property('status', 200);
                done();
            });
    });


    // //delete data 
    it('Delete Item', function (done) {
        const itemId = '646c9cd82a80c39a7e22da9b';

        chai
            .request(server)
            .delete('/items/delete/' + itemId)
            .end(function (err, res) {
                console.log("responsweee", res);
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message', 'Item delete successfully');
                expect(res.body).to.have.property('status', 404);
                done();
            });
    });


    // view by id
    it('View By Id', function (done) {
        const id = '646c9cd82a80c39a7e22da9b';

        chai
            .request(server)
            .get('/items/viewById/' + id)
            .end(function (err, res) {
                console.log("res", res.body);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Item view successfully');
                expect(res.body).to.have.property('status', 200);
                expect(res.body).to.have.property('data').that.is.an('object');
                done();
            });
    });


    // view all 
    it('View All', function (done) {
        chai
            .request(server)
            .get('/items/view')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });


    //name wise data
    it('NameWise Data', function (done) {
        const nameToSearch = 'Test Item';
        const limitData = 10;
        const page = 1;

        chai
            .request(server)
            .get('/items/nameWise')
            .query({ name: nameToSearch, limitData: limitData, page: page })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Data get successfully');
                expect(res.body).to.have.property('status', 200);
                expect(res.body).to.have.property('data').that.is.an('array');
                done();
            });
    });


    //categorywise data
    it('CategoryWise Data', function (done) {
        const nameToSearch = 'Test Category';
        const limitData = 10;
        const page = 1;

        chai
            .request(server)
            .get('/items/categoryWise')
            .query({ name: nameToSearch, limitData: limitData, page: page })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Data get successfully');
                expect(res.body).to.have.property('status', 200);
                expect(res.body).to.have.property('data').that.is.an('array');
                done();
            });
    });


})