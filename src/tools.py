from datetime import datetime, timezone

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
    
    def format_datetime(dt, include_time):
        return dt.strftime(f"%B %d, %Y{' at %I:%M%p' if include_time else ''}")