
import json
import os
import subprocess
from urllib.parse import urlparse

# Path to the JSON data
json_file_path = 'data/home-data.json'
images_dir = 'uploads/games'

# Ensure the directory exists
os.makedirs(images_dir, exist_ok=True)

try:
    with open(json_file_path, 'r') as f:
        data = json.load(f)

    # The data structure seems to be { "status": 200, "data": [ ... ] }
    # but based on previous view_file, it was {"status":200,"data":[{...}]}
    
    if 'data' in data and isinstance(data['data'], list):
        items = data['data']
    else:
        # Fallback if structure is different or just a list
        items = data if isinstance(data, list) else []

    downloaded_count = 0
    updated_items = []

    for item in items:
        if 'image' in item and item['image']:
            img_url = item['image']
            
            # Create a simplified filename
            # We can use the 'name' field if available, or hash the URL, or keep the basename
            # Let's try to keep the basename but sanitize it
            parsed_url = urlparse(img_url)
            basename = os.path.basename(parsed_url.path)
            
            # Fallback for complex URLs or query params
            if not basename or '.' not in basename:
                basename = f"game_{items.index(item)}.png" # Default extension guess
            
            # Clean filename
            safe_filename = "".join([c for c in basename if c.isalpha() or c.isdigit() or c in (' ','.','_','-')]).rstrip()
            local_path = os.path.join(images_dir, safe_filename)
            
            # Download if not exists
            if not os.path.exists(local_path):
                print(f"Downloading {img_url} to {local_path}...")
                try:
                    # Use curl to download
                    subprocess.run(['curl', '-k', '-L', img_url, '-o', local_path], check=True, capture_output=True)
                    downloaded_count += 1
                except subprocess.CalledProcessError as e:
                    print(f"Failed to download {img_url}: {e}")
                    # Keep original URL if download fails? Or leave broken link? 
                    # Let's keep the remote URL if download fails so it might still work
                    updated_items.append(item)
                    continue
            
            # Update the item with the local path
            # The HTML expects a path relative to the site root probably
            item['image'] = local_path
        
        updated_items.append(item)

    # Save the updated JSON
    data['data'] = updated_items
    with open(json_file_path, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Process complete. Downloaded {downloaded_count} new images.")

except Exception as e:
    print(f"An error occurred: {e}")
