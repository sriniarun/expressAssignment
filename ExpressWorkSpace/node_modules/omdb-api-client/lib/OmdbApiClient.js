!function() {

    var   Class              = require('ee-class')
        , log                = require('ee-log')
        , type               = require('ee-types')
        , RestfulAPI         = require('restful-api-client')
        , APISpecfication    = require('../definition/definition');





    module.exports = new Class({
        inherits: RestfulAPI

        , init: function init(APIKey) {
            this.apiKey = APIKey;

            // automatically build the api
            return init.super.call(this, APISpecfication);
        }


        /**
         * add my auth token to each of the requests
         */
        , prepareRequest: function(request) {
            if (!request.query) request.query = {};

            request.query.v = 1;
            request.query.r = 'json';

            // the api down regularly, we ddont want to wait for that
            request.timeout = 5000;

            if (this.apiKey) request.apikey = this.apiKey;

            if (request.query.callback) delete request.query.callback;
        }


        /**
         * add the content type to the response since
         * the omdb api is extremly not restful!
         */
        , prepareResponse: function(response) {
            if (response && response.headers) {
                response.headers['content-type'] = 'application/json';
            }
        }



        /**
         * yeah, clean up the messy content!
         */
        , prepareResponseContent: function(data) {
            if (data && type.object(data) && data !== null) {
                if (data.Response) delete data.Response;

                Object.keys(data).forEach(function(propertyName) {
                    var newName = propertyName[0].toLowerCase()+propertyName.slice(1);
                    // i like lowercase stuff
                    data[newName] = data[propertyName];
                    delete data[propertyName];

                    // set correct null values
                    if (data[newName] === 'N/A') data[newName] = null;

                    switch (newName) {
                        case 'genre':
                            if (data.genre) data.genres = data.genre.split(/,\s?/gi);
                            delete data.genre;
                            break;

                        case 'year':
                            if (data.year && data.year.trim()) data.year = parseInt(data.year, 10);
                            break;

                        case 'released':
                            if (data.released && data.released.trim()) data.released = new Date(data.released);
                            break;

                        case 'runtime':
                            if (data.runtime && data.runtime.trim()) data.runtime = parseInt(data.runtime, 10);
                            break;

                        case 'director':
                            if (data.director && data.director.trim()) data.directors = data.director.split(/,\s?/gi);
                            delete data.director;
                            break;

                        case 'writer':
                            if (data.writer && data.writer.trim()) data.writers = data.writer.split(/,\s?/gi);
                            delete data.writer;
                            break;

                        case 'actors':
                            if (data.actors && data.actors.trim()) data.actors = data.actors.split(/,\s?/gi);
                            break;

                        case 'country':
                            if (data.country && data.country.trim()) data.countries = data.country.split(/,\s?/gi);
                            delete data.country;
                            break;

                        case 'language':
                            if (data.language && data.language.trim()) data.languages = data.language.split(/,\s?/gi);
                            delete data.language;
                            break;
                    }
                }.bind(this));
            }
            
            return data;
        }
    });
}();
