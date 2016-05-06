/* jshint browser: false, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $ */

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var _ = require('lodash');

Scraper = {
  data: undefined,
  now: undefined,
  requestUrls: undefined,
  pollutionTypes: [
    'so2',
    'co',
    'nox',
    'no2',
    'no',
    'o3',
    'pm10',
    'pm2',
    'wsp',
    'wdr',
    'tmp',
    'rh'
  ],

  getTime: function() {
    var _this = this;

    _this.now = moment();
  },

  getLocations: function() {
    var _this = this;
  },

  setupDataObject: function() {
    var _this = this;

    _this.data = [
      date = now.format('Y') + ' ' + now.format('MM'),
      // create objects for each location here
      locations = [],
    ];

  },

  createDataUrl: function(type) {
    var _this = this;
    var year = _this.now.format('Y');
    var month = _this.now.format('MM');

    return 'http://www.aire.df.gob.mx/estadisticas-consultas/concentraciones/respuesta.php?qtipo=HORARIOS&parametro=' + type + '&anio=' + year + '&qmes=' + month
  },

  requestData: function(type) {
    var _this = this;

    console.log('Requesting ' + type + ' data');

    return request({
      uri: _this.createDataUrl(type),
    }, function(error, response, body) {

      if (error) {
        console.log('Request error:', error);
      } else {
        _this.scrapeData(body, type);
      }

    });

  },

  scrapeData: function(body, type) {
    var _this = this;
    var $ = cheerio.load(body);

    var locations = [];

    $('#glideDiv tr').last().children('td').slice(2).each(function(index, item) {

      locations.push($(this).text());

    });

    $('#glideDiv').remove();

    var hour = $('.td_tabla_difusion tr').last().children('td').first().next().text();

    console.log('Hour:', hour);

    $('.td_tabla_difusion tr').last().children('td').slice(2).each(function(index, item) {

      console.log(locations[index] + ' -> ' + $(this).text());

    });

  },

  dev: function() {
    var _this = this;

    _this.getTime();

    _this.requestData(_this.pollutionTypes[6]);
  },

}

Scraper.dev();

// create request url[s]
// make requests
// scrape final row of table
// save/export data