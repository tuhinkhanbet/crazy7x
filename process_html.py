
import re

try:
    files = [
        'index_raw.html', 
        'promotions.html', 
        'contact.html', 
        'apps.html', 
        'about.html', 
        'responsible-gambling.html', 
        'tos.html', 
        'privacy.html',
        'partner.html' # Include only if it has content, logic below will handle
    ]

    for filename in files:
        target_filename = 'index.html' if filename == 'index_raw.html' else filename
        
        if filename != 'index_raw.html':
            # For other files, we are reading the file itself
            try:
                with open(filename, 'r') as f:
                    content = f.read()
            except FileNotFoundError:
                print(f"File not found: {filename}")
                continue
        else:
             with open('index_raw.html', 'r') as f:
                content = f.read()

        # Replace assets URLs to local relative paths
        content = content.replace('https://crazy7x.com/assets/', 'assets/')
        content = content.replace('https://crazy7x.com/views/', 'views/')
        content = content.replace('https://crazy7x.com/uploads/', 'uploads/')

        # Replace nav links
        content = content.replace('href="https://crazy7x.com"', 'href="index.html"')
        content = content.replace('href="https://crazy7x.com/"', 'href="index.html"')
        content = content.replace('href="https://crazy7x.com/promotions"', 'href="promotions.html"')
        content = content.replace('href="https://crazy7x.com/contact"', 'href="contact.html"')
        content = content.replace('href="https://crazy7x.com/partner"', 'href="partner.html"')
        content = content.replace('href="https://crazy7x.com/apps"', 'href="apps.html"')
        content = content.replace('href="https://crazy7x.com/about"', 'href="about.html"')
        content = content.replace('href="https://crazy7x.com/responsible-gambling"', 'href="responsible-gambling.html"')
        content = content.replace('href="https://crazy7x.com/tos"', 'href="tos.html"')
        content = content.replace('href="https://crazy7x.com/privacy"', 'href="privacy.html"')


        # Fix siteUrl in JS
        content = content.replace("var siteUrl     = 'https://crazy7x.com';", "var siteUrl     = '';")

        # Fix AJAX call for home data (only relevant if script is present, harmless otherwise)
        content = content.replace('url:siteUrl+"/data/home-data"', 'url:"data/home-data.json"')
        content = content.replace('method:"POST"', 'method:"GET"')
        content = content.replace('data:{provider:provider}', 'data:{}') 

        # Write data
        with open(target_filename, 'w') as f:
            f.write(content)
        
        print(f"Processed {target_filename}")

except Exception as e:
    print(f"Error: {e}")
