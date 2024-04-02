import json
import requests

class BotCrypto:
    @staticmethod
    def check_asset_exists(asset):
        #check for 404 or error maybe? may have to check json response further
        return True

    @staticmethod
    async def add_position(user_id, asset, quantity, price, currency):
        asset_exists = BotCrypto.check_asset_exists(asset)

        existing_tracking_list = json.load(open("./positions.json"))

        if asset_exists:
            if any(record["user_id"] == user_id and record["asset"].upper() == asset.upper() for record in existing_tracking_list):
                existing_record = next((record for record in existing_tracking_list if record["user_id"] == user_id and record["asset"].upper() == asset.upper()), None)

                if existing_record is not None:
                    existing_record["asset"] = asset.upper()
                    existing_record["quantity"] = quantity
                    existing_record["price"] = price
                    existing_record["currency"] = currency
            else:
                existing_tracking_list.append({
                    "user_id": user_id,
                    "asset": asset.upper(),
                    "quantity": quantity,
                    "price": price,
                    "currency": currency
                })

            with open("./positions.json", "w") as file:
                file.write(json.dumps(existing_tracking_list))
            
            return True
        else: return False

    @staticmethod
    def get_current_asset_price(asset):
        response = requests.post("")

        return response.json()