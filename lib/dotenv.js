'use strict';

const path = require('find-config')('.env');

require('dotenv').config({path});
