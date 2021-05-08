fn main() {
    assert_eq!(race(720, 850, 70), Some(vec![0, 32, 18]));
    assert_eq!(race(80, 100, 40), Some(vec![2, 0, 0]));
    assert_eq!(race(80, 91, 37), Some(vec![3, 21, 49]));
    assert_eq!(race(820, 81, 550), None);

    println!("passed");
}

fn race(v1: i32, v2: i32, g: i32) -> Option<Vec<i32>> {
    if v1 > v2 {
        return None;
    }
    let secs = g * 3600 / (v2 - v1);
    
    return Some(vec![secs / 3600, (secs % 3600) / 60, secs % 60]);
}
