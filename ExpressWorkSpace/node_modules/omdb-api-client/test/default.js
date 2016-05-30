
	
	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
		, assert 		= require('assert');



	var OMBDAPI = require('../')
		, omdb;



	describe('The OMBDAPI', function() {
		it('should not crash when instantiated', function() {
			omdb = new OMBDAPI();
		});
		


		it('should be able to list movies', function(done) {
			this.timeout(10000);

			omdb({t:'chappie'}).list().then(function(movie) {
				assert(movie);
				done();
			}).catch(done);
		});



		it('should be able to identify errors', function(done) {
			this.timeout(10000);

			omdb({t:'chappipe'}).list().then(function(movie) {}).catch(function(err) {
				assert(err instanceof Error);
				done();
			});
		});
	});
	