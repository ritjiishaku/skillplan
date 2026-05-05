import os

def final_clean_repair():
    path = r'c:\Users\ritji\Desktop\AI Automation Engineering Course\index.html'
    
    # Common corrupted sequences observed in the user's view
    # ≡ƒôä -> 📄
    # Γû╢∩╕Å -> ▶️
    # ┬╖ -> ·
    # ΓÇö -> —
    
    try:
        # Read as binary to avoid encoding guessing
        with open(path, 'rb') as f:
            raw = f.read()
        
        # Try to decode as UTF-8 first
        try:
            content = raw.decode('utf-8')
        except UnicodeDecodeError:
            # If it fails, it might be double encoded or CP1252
            content = raw.decode('cp1252', errors='replace')
            
        # Repair sequences
        # These are CP1252/CP437 representations of UTF-8 bytes
        replacements = {
            'ΓÇö': '—',
            '┬╖': '·',
            'Γû╢∩╕Å': '▶️',
            '≡ƒôä': '📄',
            'Γ£à': '✅',
            '≡ƒöº': '🛠️',
            '≡ƒôû': '📖',
            '≡ƒÉì': '🐍',
            '≡ƒôæ': '📋',
            '≡ƒÅ¡': '🏥',
            '≡ƒÜÇ': '🚀',
            '≡ƒæ⌐ΓÇìΓÜò∩╕Å': '👩‍⚕️',
            'ΓÅ▒': '⏱',
            '┬á': ' ',
            '': ' ', # Replacement character
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
            
        # Also fix the weird "·" separated letters if any
        import re
        content = re.sub(r'·(.)', r'\1', content)
        
        # Write back as UTF-8 with BOM for Windows compatibility
        with open(path, 'w', encoding='utf-8-sig', newline='\n') as f:
            f.write(content)
            
        print("Final clean repair (UTF-8-SIG) complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    final_clean_repair()
