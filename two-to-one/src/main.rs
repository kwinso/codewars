fn main() {
    assert_eq!(longest("aretheyhere", "yestheyarehere"), "aehrsty");
    assert_eq!(longest("loopingisfunbutdangerous", "lessdangerousthancoding"), "abcdefghilnoprstu");
    println!("Passed.");
}

fn longest(a1: &str, a2: &str) -> String {
    let mut out = String::new();

    let mut s = String::from(a1);
    s.push_str(a2);


    let mut chars: Vec<char> = s.chars().collect();
    chars.sort_by(|a, b| a.cmp(b));


    for c in chars {
        if out.find(c) == None {
            out.push(c);
        }
    }

    return out;
}