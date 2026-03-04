export interface TrendPoint {
  count: number;
}

export interface TrendResult {
  value: number;
  isPositive: boolean;
}

/**
 * Calculates the trend based on the difference between the first and second half of the data.
 */
export function calculateTrend(trendData: TrendPoint[] | undefined): TrendResult {
  if (!trendData || trendData.length < 2) return { value: 0, isPositive: true };

  const mid = Math.floor(trendData.length / 2);
  const firstHalf = trendData.slice(0, mid).reduce((acc, curr) => acc + curr.count, 0);
  const secondHalf = trendData.slice(-mid).reduce((acc, curr) => acc + curr.count, 0);

  if (firstHalf === 0) {
    return { value: secondHalf > 0 ? 100 : 0, isPositive: secondHalf >= 0 };
  }

  const diff = ((secondHalf - firstHalf) / firstHalf) * 100;
  return {
    value: Math.abs(diff),
    isPositive: diff >= 0
  };
}

/**
 * Generates an SVG path for a trend line.
 */
export function getTrendPath(trend: TrendPoint[] | undefined, width: number = 200, height: number = 40): string {
  if (!trend || trend.length === 0) return '';
  const max = Math.max(...trend.map(t => t.count), 1);
  const step = width / (trend.length - 1);

  const points = trend.map((t, i) => {
    const x = i * step;
    const y = height - (t.count / max) * height;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  });

  return points.join(' ');
}
