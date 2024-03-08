import requests
import json

from config import BotConfig

class BotAI:
    @staticmethod
    def gpt_response(prompt):
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 512,
            "top_p": 1,
            "temperature": 0.5,
            "frequency_penalty": 0,
            "presence_penalty": 0
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", data=json.dumps(data), headers={
            "User-Agent": "MyApp/1.0",
            "Authorization": f"Bearer {BotConfig.openai_token}",
            "Content-Type": "application/json",
        })

        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            return response.json()