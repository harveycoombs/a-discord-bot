use reqwest::header::{HeaderMap, HeaderValue, USER_AGENT};
use reqwest::{Client, Response, Error};

mod bot_tools {
    async fn get_request(url: &str) -> Result<Response, Error> {
        let client = reqwest::Client::new();
    
        let response = client
            .get(url)
            .header("Authorization", "Bot {TOKEN}")
            
            .send()
            .await?;
        
        Ok(response)
    }
    
    async fn post_request(url: &str, body: String) -> Result<Response, Error> {
        let client = reqwest::Client::new();
    
        let response = client
            .post(url)
            .header("Content-Type", "application/json")
            .header("Authorization", "Bot {TOKEN}")
            .body(body)
            .send()
            .await?;
        
        Ok(response)
    }

    async fn patch_request(url: &str, body: String) -> Result<Response, Error> {
        let client = reqwest::Client::new();
    
        let response = client
            .patch(url)
            .header("Content-Type", "application/json")
            .header("Authorization", "Bot {TOKEN}")
            .body(body)
            .send()
            .await?;
        
        Ok(response)
    }    
}