export function drawGradient(chart: any, startColor: string, endColor: string, isVertical?: boolean) {
  const {
    ctx,
    chartArea: { top, bottom, left, right }
  } = chart;
  let gradient = ctx.createLinearGradient(left, 0, right, 0);
  if (isVertical) {
    gradient = ctx.createLinearGradient(0, bottom, 0, top);
  }
  gradient.addColorStop(0, startColor);
  gradient.addColorStop(1, endColor);

  return gradient;
}
