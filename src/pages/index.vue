<script setup lang="ts">
import * as d3 from 'd3';

import { bars, axis, labels, ticker } from '../services/chart';
import { width, height, keyframes, duration, x } from '../services/chart/constants';

const chartContainerRef = ref<HTMLElement | null>(null);
let svg: d3.Selection<SVGSVGElement, undefined, null, undefined> | null = null;
let svgId = ref<number>(0);

const play = async () => {
	if (!chartContainerRef.value) {
		console.error('Chart ref not created');
		return;
	}

	if (svg) {
		svg.remove();
	}
	let _id = new Date().getTime();
	svgId.value = _id;

	svg = d3
		.create('svg')
		.attr('viewBox', [0, 0, width, height])
		.attr('width', width)
		.attr('height', height)
		.attr('style', 'max-width: 100%; height: auto;');

	const updateBars = bars(svg);
	const updateAxis = axis(svg);
	const updateLabels = labels(svg);
	const updateTicker = ticker(svg);

	chartContainerRef.value!.appendChild(svg.node() as Node);

	for (const keyframe of keyframes) {
		if (_id !== svgId.value) break;
		const _keyframe: any = keyframe;
		const transition = svg.transition().duration(duration).ease(d3.easeLinear);

		// Extract the top bar’s value.
		x.domain([0, _keyframe[1][0].value]);

		updateAxis(_keyframe, transition);
		updateBars(_keyframe, transition);
		updateLabels(_keyframe, transition);
		updateTicker(_keyframe, transition);

		// invalidation.then(() => svg.interrupt());
		await transition.end();
	}
};

onMounted(async () => {
	play();
});
</script>

<template>
	<main class="container">
		<header class="header">
			<button class="play" @click="play" style="margin-bottom: 1rem">Replay</button>
		</header>
		<div class="chart-container" ref="chartContainerRef"></div>
	</main>
</template>

<style lang="scss" scoped>
.container {
	margin: 0 auto;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.header {
	display: flex;
	align-items: center;
}
.chart-container {
	width: 100%;
	height: 100%;
	max-height: 600px;
}

.play {
	background-color: #4caf50;
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	border-radius: 8px;
}
</style>
