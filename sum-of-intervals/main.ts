export function sumOfIntervals(intervals: [number, number][]): number {
    let len = 0;

    for (let i = 0; i < intervals.length; i++) {
        let start = intervals[i][0];
        let end = intervals[i][1];

        for (let j = 0; j < intervals.length; j++) {
            if (i == j) continue;

            let nextStart = intervals[j][0];
            let nextEnd = intervals[j][1];

            if (start <= nextStart && nextStart <= end) {
                end = end > nextEnd ? end : nextEnd;
                intervals.splice(i, 1);
                if (i > j) intervals.splice(j, 1);
                else intervals.splice(j - 1, 1);
                intervals.unshift([start, end]);
                i = -1;
                break;
            }
        }
    }


    for (let interval of intervals) {
        len += interval[1] - interval[0];
    }
    return len;
}




// Tests, right shoud be equal to right.
console.log(sumOfIntervals([[1, 5]]), 4);
console.log(sumOfIntervals([[1, 5], [6, 10]]), 8);
console.log(sumOfIntervals([[1, 5], [1, 5]]), 4);
console.log(sumOfIntervals([[1, 4], [7, 10], [-3, 5]]), 7);