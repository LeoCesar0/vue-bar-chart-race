import * as d3 from 'd3';
import data from '../../../public/data.json';

const duration = 250;
const n = 12;

const barSize = 48;

const marginTop = 16;

const marginRight = 6;

const marginBottom = 6;

const marginLeft = 0;

const width = 600;

const x = d3.scaleLinear([0, 1], [marginLeft, width - marginRight]);

const y = d3
	.scaleBand()
	.domain(d3.range(n + 1))
	.rangeRound([marginTop, marginTop + barSize * (n + 1 + 0.1)])
	.padding(0.1);

const k = 10;

const height = marginTop + barSize * n + marginBottom;

function formatDate(date) {
	return `${date.getMonth() + 1}/${date.getFullYear()}`;
}

function _color() {
	const scale = d3.scaleOrdinal(d3.schemeTableau10);
	if (data.some((d) => d.category !== undefined)) {
		const categoryByName = new Map(data.map((d) => [d.name, d.category]));
		scale.domain(categoryByName.values());
		return (d) => scale(categoryByName.get(d.name));
	}
	return (d) => scale(d.name);
}
const color = _color();

const formatNumber = d3.format(',d');

const tickFormat = undefined;

function textTween(a, b) {
	const i = d3.interpolateNumber(a, b);
	return function (t) {
		this.textContent = formatNumber(i(t));
	};
}

const names = new Set(data.map((d) => d.name));

const dateValues = Array.from(
	d3.rollup(
		data,
		([d]) => d.value,
		(d) => new Date(d.date).getTime(),
		(d) => d.name,
	),
)
	.map(([date, data]) => {
		return [new Date(date), data];
	})
	.sort(([a], [b]) => d3.ascending(a, b));

function rank(value) {
	const data = Array.from(names, (name) => ({ name, value: value(name) }));
	data.sort((a, b) => d3.descending(a.value, b.value));
	for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
	return data;
}

function _keyframes() {
	const keyframes = [];
	let ka, a, kb, b;
	for ([[ka, a], [kb, b]] of d3.pairs(dateValues)) {
		for (let i = 0; i < k; ++i) {
			const t = i / k;
			keyframes.push([
				new Date(ka * (1 - t) + kb * t),
				rank((name) => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t),
			]);
		}
	}
	keyframes.push([new Date(kb), rank((name) => b.get(name) || 0)]);
	return keyframes;
}
const keyframes = _keyframes();

const nameframes = d3.groups(
	keyframes.flatMap(([, data]) => data),
	(d) => d.name,
);

function _prev() {
	return new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
}
const prev = _prev(nameframes, d3);

function _next() {
	return new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));
}
const next = _next(nameframes, d3);

export {
	duration,
	n,
	barSize,
	marginTop,
	marginRight,
	marginBottom,
	marginLeft,
	x,
	y,
	height,
	tickFormat,
	formatDate,
	color,
	textTween,
	names,
	dateValues,
	rank,
	keyframes,
	prev,
	next,
	width,
};
