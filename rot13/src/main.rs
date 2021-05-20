fn main() {
    assert_eq!(rot13("test"), "grfg");
    assert_eq!(rot13("Test"), "Grfg");
    println!("Passed.");
}

fn rot13(message: &str) -> String {
    let mut out = String::new();
    for i in message.chars() {
        if i.is_ascii_alphabetic() {
            let c = i as u8 + 13;
            let lower_digit = if i.is_ascii_uppercase() { 64 } else { 96 };
            let upper_digit = lower_digit + 26;

            if c > upper_digit {
                out.push((lower_digit + (c - upper_digit)) as char);
            } else {
                out.push(c as char);
            }
        } else {
            out.push(i);
        }
    }

    return out;
}
