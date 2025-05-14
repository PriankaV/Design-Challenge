import pandas as pd
import requests
import time
from typing import Dict

def geocode_address(address: str, api_key: str) -> Dict:
    """Geocode an address using Google Geocoding API."""
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": api_key
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        result = response.json()
        
        if result["status"] == "OK":
            location = result["results"][0]["geometry"]["location"]
            return {
                "lat": location["lat"],
                "lng": location["lng"],
                "status": "success"
            }
        else:
            return {
                "lat": None,
                "lng": None, 
                "status": result["status"]
            }
    except Exception as e:
        return {
            "lat": None,
            "lng": None,
            "status": str(e)
        }

def process_food_banks(input_file: str, output_file: str, api_key: str):
    """Process food bank addresses and create geocoded CSV using pandas."""
    
    # Read CSV into pandas DataFrame
    df = pd.read_csv(input_file, skipinitialspace=True)
    print(df.columns)
    # Create empty lists to store geocoding results
    lats = []
    lngs = []
    statuses = []
    
    # Process each row
    for idx, row in df.iterrows():
        # Construct full address
        full_address = f"{row['Address']}, {row['City']}, {row['State Zipcode']}"
        
        # Get geocoding data
        geocode_result = geocode_address(full_address, api_key)
        
        # Store results
        lats.append(geocode_result['lat'])
        lngs.append(geocode_result['lng'])
        statuses.append(geocode_result['status'])
        
        # Sleep to respect API rate limits
        time.sleep(0.1)
    
    # Add new columns to DataFrame
    df['latitude'] = lats
    df['longitude'] = lngs
    df['geocoding_status'] = statuses
    
    # Save to CSV
    df.to_csv(output_file, index=False)

if __name__ == "__main__":
    API_KEY = "AIzaSyBBKP_WL23xgy00U1jNSxoQ-qAzcQTyrCo"  # Replace with your actual API key
    INPUT_FILE = "trial.csv"
    OUTPUT_FILE = "food_banks_geocoded.csv"
    
    process_food_banks(INPUT_FILE, OUTPUT_FILE, API_KEY)