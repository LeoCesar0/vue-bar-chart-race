import * as d3 from 'd3';
import { marginTop, width, tickFormat, barSize, n, y, x } from './constants';

export default function axis(svg) {
	const g = svg.append('g').attr('transform', `translate(0,${marginTop})`);

	const axis = d3
		.axisTop(x)
		.ticks(width / 160, tickFormat)
		.tickSizeOuter(0)
		.tickSizeInner(-barSize * (n + y.padding()));

	return (_, transition) => {
		g.transition(transition).call(axis);
		g.select('.tick:first-of-type text').remove();
		g.selectAll('.tick:not(:first-of-type) line').attr('stroke', 'white');
		g.select('.domain').remove();
	};
}
