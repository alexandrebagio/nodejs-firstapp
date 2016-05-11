module.exports = function(app) { 
	
	var listaProdutos = function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);


		produtosDAO.lista(function(errors, results) {
			res.format({
				html : function() {
					res.render('produtos/lista',{lista:results});
				},
				json : function() {
					res.json(results);
				}
			});
		});
	};

	app.get('/produtos', listaProdutos);

	app.get('/produtos/form', function(req, res) {
		res.render('produtos/form', {errosValidacao:{}, produtos:{}});
	});

	app.post('/produtos', function(req, res) {
		var produtos = req.body;

		req.assert('nome', 'Nome do produto é obrigátorio').notEmpty(); // validacao express-validator

		var erros = req.validationErrors();
		if (erros) {
			res.format({
				html : function() {
					res.status(400).render('produtos/form', {errosValidacao: erros, produtos:produtos});
				},
				json : function() {
					res.status(400).json(erros);
				}
			});
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.salva(produtos, function(errors, results) {
			res.redirect('/produtos');
		});
	});
}