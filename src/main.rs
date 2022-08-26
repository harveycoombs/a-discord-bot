//Harvey Coombs, 2022
use reqwest::Client;
use std::future::Future;

struct UserData {
    id: i32,
    username: String,
    tag: String,
    created_when: String,
    avatar_url: String,
    banner_url: String,
    banner_color: String,
    is_bot: bool
}

#[tokio::main]
async fn main() {
    //TO-DO: Rewrite JS bot in Rust...
}

async fn discord_request(endpoint:&str) -> String {
    let client = reqwest::Client::new();
    let req = client.get(String::from("https://discord.com/api/") + endpoint)

    .header("Authorization", "Bot {TOKEN}")
    .header("User-Agent", "DiscordBot (https://harveycoombs.com/; 1.0.0.)")
    .header("Content-Type", "application/json; charset=UTF-8")

    .send().await
    .expect("Unsuccessful GET.")
    .text().await
    .expect("Invalid response.");

    return req;
}

async fn discord_authorize() {
  //TO-DO  
}

async fn fetch_user_detail(the_id:&str) {
    let url:String = format!("users/{}", the_id);
    let target:&str = url.as_str();

    let resp:String = discord_request(target).await;

    let raw = json::parse(resp.as_str()).unwrap();

    //TO-DO
}

async fn fetch_guild_detail() {
    //TO-DO  
}
