require('dotenv').config();
const GSheets = require('./googleSheets');
const GGroups = require('./googleGroups');
const GMail = require('./googleMail');
const Salesforce = require('./salesforce');
const GitHub = require('./github');
const Learn = require('./learn');
const Slack = require('./slack');

exports.GSheets = GSheets;
exports.GGroups = GGroups;
exports.GMail = GMail;
exports.Salesforce = Salesforce;
exports.GitHub = GitHub;
exports.Learn = Learn;
exports.Slack = Slack;
