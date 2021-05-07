# Persistent Buggger

Write a function, `persistence`, that takes in a positive parameter `num` and returns its multiplicative persistence, which is the number of times you must multiply the digits in `num` until you reach a single digit.

For example:

```rust
persistence(39);    // returns 3, because 3*9=27, 2*7=14, 1*4=4
                    // and 4 has only one digit

persistence(999);   // returns 4, because 9*9*9=729, 7*2*9=126,
                    // 1*2*6=12, and finally 1*2=2

persistence(4);     // returns 0, because 4 is already a one-digit number
```


# What Have I Learned?
### Finding amount of digits in number with math
```rust
fn count_digits(mut number: u64) -> usize {
    let mut count = 0;

    // Since integers divided without floating, we can count amount of digits like that
    while number != 0 {
        number = number / 10;
        count += 1;
    }

    return count; 
}
```
### Get Any Digit of number
Example:
- 1234, get the 3rd number from end
- 3rd number from end is 2, it's hundreed
- `1234 / 100 % 10` == 2
> mod 10 to discard 1000's and higher

# Better solution
Probably, we don't need to store every digit of number, we just need to get every digit.  
So, we can just get the last digit and truncate the number. 
```rust
fn persistence(mut n: u64) -> u64 {
    if n < 10 {
        0
    } else {
        let mut v = 1u64;
        
        while n != 0 {
            // Get last digit
            v *= n % 10; 
            // Remove this digit
            n /= 10;
        }
        
        persistence(v)+1
    }
}
```
