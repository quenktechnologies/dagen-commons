#!/bin/env node

// Quick and dirty script for transforming strings.

const path = require('path');
const docopt = require('docopt');

const strings = require('@quenk/noni/lib/data/string');

const bin = path.basename(__filename);

const transforms = {
    trim: s => s.trim(),
    lowercase: s => s.toLowerCase(),
    uppercase: s => s.toUpperCase(),
    capitalize: strings.capitalze,
    uncapitalize: strings.uncapitalize,
    camelcase: strings.camelcase,
    classcase: strings.classcase,
    modulecase: strings.modulecase,
    propercase: strings.propercase,
    alpha: strings.alpha,
    numeric: strings.numeric,
    alphanumeric: strings.alphaNumeric
};

const list = Object.keys(transforms).join(',');

const args = docopt.docopt(`
    Usage:
       ${bin} [--transform=NAME...] <string>...

    Options:
      -h --help                  Show this output.
      -t NAME --transform NAME   The transform to apply one of ${list}.
      --version                  Show version.
    `, { version: require('../package.json').version });

let output = args['<string>'].map(str =>
    args['--transform'].reduce((prev, curr) => {

        if (!transforms.hasOwnProperty(curr)) {
            console.error(`Unknown transform "${curr}"!`);
            process.exit(1);
        }

        return transforms[curr](prev);

    }, str));

process.stdout.write(output.join(' '));
