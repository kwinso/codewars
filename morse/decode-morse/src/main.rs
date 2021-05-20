use std::collections::HashMap;


fn main() {
    assert_eq!(decode_morse(".... . -.--   .--- ..- -.. ."), "HEY JUDE");

    println!("Passed");
}
fn decode_morse(encoded: &str) -> String {
    // This will be imported at the top in the actual cata
    let mut MORSE_CODE = HashMap::new();

    MORSE_CODE.insert(String::from("...."), String::from("H"));
    MORSE_CODE.insert(String::from("."), String::from("E"));
    MORSE_CODE.insert(String::from("-.--"), String::from("Y"));
    MORSE_CODE.insert(String::from(".---"), String::from("J"));
    MORSE_CODE.insert(String::from("..-"), String::from("U"));
    MORSE_CODE.insert(String::from("-.."), String::from("D"));

    
    encoded.trim().split("   ").map(|w| {
        w.split(' ').map(|c| {
            if let Some(code) = MORSE_CODE.get(c) {
                code.clone()
            } else {
                String::new()
            } 
        }).collect::<String>()
    }).collect::<Vec<String>>().join(" ")
}