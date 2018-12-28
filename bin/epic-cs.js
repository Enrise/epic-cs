#!/usr/bin/env node

const packageJson = require('../package.json');
const setup = require('../lib/setup');

setup(packageJson.version);
