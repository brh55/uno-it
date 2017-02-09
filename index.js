'use strict';
const roundTo = require('round-to');
const convert = require('convert-units');

module.exports = (input, desiredUnit, opts) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got a ${typeof input}`);
	}

	opts = opts || {};

	const masses = convert().possibilities('mass');
	const volumes = convert().possibilities('volume');
	const lengths = convert().possibilities('length');

	let groupPattern;
	if (opts.type) {
		groupPattern = convert().possibilities(opts.type).join('|');
	} else if (masses.indexOf(desiredUnit) > -1) {
		groupPattern = masses.join('|');
	} else if (volumes.indexOf(desiredUnit) > -1) {
		groupPattern = volumes.join('|');
	} else if (lengths.indexOf(desiredUnit) > -1) {
		groupPattern = lengths.join('|');
	} else {
		throw new Error(`Expected units to be of either: volume, mass, or length. Instead got ${desiredUnit}`);
	}
	const unitRegEx = new RegExp(groupPattern);
	const valuePattern = '[-+]?[0-9]*\\.?[0-9]+';
	const valueRegEx  = new RegExp(valuePattern);
	const inputRegEx = new RegExp(`((${valuePattern})\\s?(${groupPattern}))`, 'g');

	const inputs = input.match(inputRegEx);

	if (!inputs) {
		throw new Error('Expecting string to contain measurements');
	}

	const sum = inputs
					.map(input => [input.match(valueRegEx)[0], input.match(unitRegEx)[0]])
					.map(input => parseFloat(convert(input[0]).from(input[1]).to(desiredUnit)))
					.reduce((a, b) => a + b);

	return roundTo(sum, (opts.round || 2));
};
