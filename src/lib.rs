use coral_tools;

mod coral {
    pub struct DiscordStatus {
        text: String,
        emoji_name: String,
        emoji_id: u64
    }

    pub struct DiscordBot {
        token: String,
        status: DiscordStatus
    }

    impl DiscordBot {
        pub fn create(token: String) -> self {
            self.token = token;

            let response = coral_tools::get_request("https://discord.com/api/gateway/bot").await?;
            let response_body = response.text().await?;
        }

        pub fn set_status(status: &str) {
            self.status = status.to_string();
        }
    }
}