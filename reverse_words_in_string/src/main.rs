fn main() {
    let out = reverse_words("double  spaces ");

}

fn reverse_words(input: &str) -> String {
    // your code here
    let mut word: String = String::from("");
    let mut out = String::new();
    
    for c in input.chars() {
        if c == ' ' {
            out.push_str(&rev_word(&word));
            out.push(' ');            
            word = String::new();

            continue;
        }
    
        word.push(c);
    }

    out.push_str(&rev_word(&word));

    return out;
}

fn rev_word(word: &String) -> String {
    word.chars().rev().collect::<String>()
}
