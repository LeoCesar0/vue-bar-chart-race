import { width, marginTop, barSize, keyframes, formatDate, n } from './constants';

export default function ticker(svg) {
	const now = svg
		.append('text')
		.style('font-weight', `semi-bold`)
		.style('font-size', `${32}px `)
		.attr('text-anchor', 'end')
		.attr('x', width - 6)
		.attr('y', marginTop + barSize * (n - 0.45))
		.attr('dy', '0.32em')
		.text(formatDate(keyframes[0][0]));

	return ([date], transition) => {
		transition.end().then(() => now.text(formatDate(date)));
	};
}
