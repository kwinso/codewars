fn main() {
    assert_eq!(persistence(25), 2);
    assert_eq!(persistence(999), 4);
    assert_eq!(persistence(4), 0);

    println!("Tests Passsed");
}

fn persistence(mut num: u64) -> u64 {
    // Our out value
    let mut per = 0;
    // Amount of digits in number
    let mut digits = count_digits(num);
    // Base of 10 to find different digits
    let ten: u64 = 10;
    
    while digits > 1 {
        let mut new_num = 1;

        // Going through every digit in number
        for pow in 0..digits {
            // Since every digit represents ones, tens, hundreeds
            // We find current power of 10 for this digits
            let t = ten.pow(pow as u32);
            // Found digit value
            let amount = num / t % 10;

            new_num *= amount;
        }

        num = new_num;
        per += 1;

        digits = count_digits(num);
    }

    return per;
}

fn count_digits(mut number: u64) -> usize {
    let mut count = 0;

    // Since integers divided without floating, we can count amount of digits like that
    while number != 0 {
        number = number / 10;
        count += 1;
    }

    return count; 
}