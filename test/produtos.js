var express = require('../config/express')();
var request = require('supertest')(express);

var DatabaseCleaner = require('database-cleaner');
var database_cleaner = new DatabaseCleaner('mysql');


describe('#ProdutosController', function(){

	beforeEach(function(done){
		database_cleaner.clean(express.infra.connectionFactory(), done);
		/*
		var conn = ;
		conn.query('delete from produtos', function(ex, result){
			if (!ex) {
				done();
			}
		});*/
	});

	it('#listagem json',function(done){
		request.get('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-type', /json/)
		.expect(200, done);
	});

	it('#cadastro novo produto invalido', function(done){
		request.post('/produtos')
		.send({nome:""})
		.expect(400,done);
	});

	it('#cadastro novo produto valido', function(done){
		request.post('/produtos')
		.send({nome:"livro novo"})
		.expect(302,done);
	});
});