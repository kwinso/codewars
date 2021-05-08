# Tortoise Racing
Link: https://www.codewars.com/kata/55e2adece53b4cdcb900006c


# What Have I learned?
## Finding Amount of hours, minutes and seconds in seconds number with mod
```rust
let hours = seconds / 3600;
let minutes = (seconds % 3600) / 60;
let seconds = secs % 60;
```