# Two To One
Link: https://www.codewars.com/kata/5656b6906de340bd1b0000ac

# What Have I Learned
Chain chars together:
```rust
s1.chars().chain(s2.chars());
```

# Better Solutions
#1
> IDK what `BTreeSet` does lol, but I'll leave it here.
```rust
use std::collections::BTreeSet;

fn longest(a1: &str, a2: &str) -> String {
    a1.chars()
        .chain(a2.chars())
        .collect::<BTreeSet<char>>()
        .iter()
        .collect()
}
```
#2
```rust
use itertools::Itertools;

fn longest(a1: &str, a2: &str) -> String {
    format!("{}{}", a1, a2).chars().sorted().dedup().collect()
}
```