import test from 'ava';
import fn from '.';

test('Test mass inputs', t => {
	t.is(fn('90.17 kg 1 lb 100 g', 'kg'), 90.72);
	t.is(fn('90.17 kg 1 lb 100 g', 'kg', {round: 4}), 90.7236);
	t.is(fn('90.17 kgs 2 lbs 100 g', 'kg', {round: 4}), 91.1772);
	t.is(fn('90.17 kgs 2 lbs 100 g', 'g'), 91177.18);
});

test('Test lengths inputs', t => {
	t.is(fn('6ft 9in', 'ft'), 6.75);
	t.is(fn('20ft 9cms 1 inch 200 m', 'm', {round: 1}), 206.2);
	t.is(fn('1ft 3cm', 'in'), 13.18);
});

test('Test volume inputs', t => {
	t.is(fn('90 ml 10l', 'l'), 10.09);
	t.is(fn('90 ml 10 cup', 'l'), 2.46);
	t.is(fn('90 mls 10 cups', 'l'), 2.46); // Plural check
});

test('Test errors', t => {
	let error = t.throws(() => {
		fn('90.17 kg 1 lb 100 g', 'kg', {type: 'volume'});
	}, Error, 'Attempt conversion of wrong type');
	t.is(error.message, 'Cannot convert incompatible measures of mass and volume');

	error = t.throws(() => {
		fn(92, 'kg');
	}, Error, 'Non string type');
	t.is(error.message, 'Expected a string, got a number');

	error = t.throws(() => {
		fn('91 lbs 4 kg', 'hello world');
	}, Error, 'Non-relevant string');
	t.is(error.message, 'Expected units to be of either: volume, mass, or length. Instead got hello world');
})
