import html

def escape_to_html_entities():
    path = r'c:\Users\ritji\Desktop\AI Automation Engineering Course\index.html'
    try:
        with open(path, 'rb') as f:
            data = f.read()
        
        data = data.replace(b'\x00', b'')
        content = data.decode('utf-8', errors='replace')
        
        # Replace common mojibake first
        content = content.replace('ΓÇö', '—')
        content = content.replace('┬╖', '·')
        content = content.replace('Γû╢∩╕Å', '▶️')
        content = content.replace('≡ƒôä', '📄')
        
        # Escape everything non-ASCII to HTML entities
        escaped = ""
        for char in content:
            if ord(char) > 127:
                escaped += f"&#{ord(char)};"
            else:
                escaped += char
        
        with open(path, 'w', encoding='ascii', newline='\n') as f:
            f.write(escaped)
        print("HTML entity escape complete. File is now pure ASCII.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    escape_to_html_entities()
