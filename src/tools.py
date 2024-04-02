from datetime import datetime, timezone
import requests
import hashlib
import json

class BotTools:
    @staticmethod
    def format_age(dt):
        dt = dt.replace(tzinfo=None)
        now = datetime.now()

        delta = now - dt

        days = delta.days
        months = days // 30
        years = days // 365

        if years > 0:
            return f"{years} Year{'s' if years != 1 else ''}"
        elif months > 0:
            return f"{months} Month{'s' if months != 1 else ''}"
        else:
            return f"{days} Day{'s' if days != 1 else ''}"

    @staticmethod
    def format_datetime(dt, include_time):
        return dt.strftime(f"%B %d, %Y{' at %I:%M%p' if include_time else ''}")

    @staticmethod
    def compute_file_hash(url):
        response = requests.get(url)
    
        algo = hashlib.sha256()
        algo.update(response.content)
        algo.digest()
    
        return algo.hexdigest()
        
    @staticmethod
    def store_file_hash(url):
        file_hash = BotTools.compute_file_hash(url)
        hashes_list = json.load(open("hashes.json"))
    
        if file_hash not in hashes_list: 
            hashes_list.append(file_hash)
    
        file = open("hashes.json", "w")
        file.write(json.dumps(hashes_list))
        file.close()

    @staticmethod
    def is_prohibited_file(url):
        file_hash = BotTools.compute_file_hash(url)
        hashes_list = json.load(open("hashes.json"))
    
        return file_hash in hashes_list
