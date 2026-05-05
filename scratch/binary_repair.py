def repair_binary():
    path = r'c:\Users\ritji\Desktop\AI Automation Engineering Course\index.html'
    try:
        with open(path, 'rb') as f:
            data = f.read()
        
        # If it's UTF-16 (le), we might see 00 bytes
        if b'\x00' in data:
            print("Detected null bytes, likely UTF-16. Attempting conversion.")
            # This is a very basic check.
            # If it's mostly ASCII with nulls, it's UTF-16LE
            try:
                content = data.decode('utf-16')
                data = content.encode('utf-8')
            except:
                pass

        # Mapping of mojibake byte sequences
        # dY?? -> \xf0\x9f\x92\xbb
        # dY"- -> \xf0\x9f\x93\x96
        
        # Actually, let's just use the string-based repair but be careful with the encoding
        content = data.decode('utf-8', errors='replace')
        
        # Clean up the dots (null characters or similar)
        content = content.replace('\x00', '')
        # Remove the weird dots if they are literal dots from the view_file tool's interpretation
        # but wait, view_file showed dots as placeholders for non-printable chars.
        
        # Repair the known sequences
        replacements = {
            'dY??': '💻',
            'dY"-': '📖',
            'dY",': '📜',
            'dY"S': '📈',
            'dYZ"': '🎓',
            'dY"o': '📄',
            'dY""': '✍️',
            'dY"': '🔬'
        }
        for k, v in replacements.items():
            content = content.replace(k, v)
            
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print("Binary-safe repair complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    repair_binary()
