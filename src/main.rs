//Harvey Coombs, 2022
use reqwest::Client;
use std::future::Future;

#[tokio::main]
async fn main() {
    //TO-DO: Rewrite JS bot in Rust...
}

async fn discord_request(endpoint:&str) -> String {
    let client = reqwest::Client::new();
    let req = client.get(String::from("https://discord.com/api/") + endpoint)

    .header("Authorization", "Bot MTAxMDQ5Mjg3MjQzMDIwMjkyMQ.GGWf-9.Gbh0EnZ8EgdVXHgcsH-p4yo7b9onHAosHoxfrM")
    .header("User-Agent", "DiscordBot (https://harveycoombs.com/; 1.0.0.)")
    .header("Content-Type", "application/json; charset=UTF-8")

    .send().await
    .expect("Unsuccessful GET.")
    .text().await
    .expect("Invalid response.");

    return req;
}
