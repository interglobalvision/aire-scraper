/* jshint browser: false, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $ */

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var _ = require('lodash');
var Promise = require('promise');

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

  scrape: function() {
    var _this = this;

    _this.getTime();
    _this.setupDataObject();

    console.log('_this.data', _this.data);

    _this.promises = _.clone(_this.pollutionTypes);

    _.forEach(_this.pollutionTypes, function(item, index) {

      _this.promises[index] = new Promise(function(resolve, reject) {

        return request({
          uri: _this.createDataUrl(item),
        }, function(error, response, body) {

          if (error) {
            console.error('Request error:', error);
            // need error handling here
            reject(error);
          } else {
            _this.scrapeData(body, item);
            resolve(body);
          }

        });

      });

    });

    Promise.all(_this.promises).then(function(res) {

      console.log('_this.data', _this.data);

    });

  },

  getTime: function() {
    var _this = this;

    _this.now = moment();
  },

  setupDataObject: function() {
    var _this = this;

    _this.data = undefined;
    _this.data = {
      date: _this.now.format('Y') + ' ' + _this.now.format('MM'),
      pollutionTypes: [],
    };

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

    var typeData = {};
    var locations = [];

    $('#glideDiv tr').last().children('td').slice(2).each(function(index, item) {

      var locationName = $(this).text().replace(/\s/g, '');

      locations.push(locationName);

    });

    $('#glideDiv').remove();

    var hour = $('.td_tabla_difusion tr').last().children('td').first().next().text();

    if (_this.data.hour === undefined) {
      _this.data.hour = hour;
    } else if (_this.data.hour !== hour) {
      console.error('data hour mismatch');
      // need handling here to fail
      return;
    }

    $('.td_tabla_difusion tr').last().children('td').slice(2).each(function(index, item) {

      var location = locations[index];

      var value = $(this).text();

      typeData[location] = value;

    });

    _this.data.pollutionTypes.push({
      type: type,
      data: typeData,
    });

  },

}

Scraper.scrape();

// create request url[s]
// make requests
// scrape final row of table
// save/export data
