fn main() {
    assert_eq!(array_diff(vec![1, 2], vec![1]), vec![2]);
    assert_eq!(array_diff(vec![1,2,2], vec![2]), vec![1]);
    assert_eq!(array_diff(vec![1,2,3], vec![1,2]), vec![3]);
    println!("Passed.");
}

fn array_diff<T: PartialEq>(a: Vec<T>, b: Vec<T>) -> Vec<T> {
    let mut out: Vec<T> = vec![];
    for i in a {
        if !b.contains(&i) {
            out.push(i);   
        }
    }

    return out;
}
