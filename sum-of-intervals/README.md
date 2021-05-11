# Sum of intervals


## Better Solution
Just count all numbers in these intervals, lool!
```typescript
export function sumOfIntervals(intervals: [number, number][]) {
  const ranges = new Set<number>();
  intervals.forEach(([start, end]) => {
    for (let i = start; i < end; i++) ranges.add(i);
  });
  return ranges.size;
}
```