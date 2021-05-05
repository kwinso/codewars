//return the total number of smiling faces in the array
export function countSmileys(arr: string[]) {
    return arr.filter((e) => new RegExp(/^(;|:)(-|~)?(D|\))$/).test(e)).length;
}

// Tests
console.log(countSmileys([]) == 0);
console.log(countSmileys([':D', ':~)', ';~D', ':)']) == 4);
console.log(countSmileys([';]', ':[', ';*', ':$', ';-D']) == 1);
console.log(countSmileys([':)', ':(', ':D', ':O', ':;']) == 2);