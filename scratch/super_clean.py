def super_clean():
    path = r'c:\Users\ritji\Desktop\AI Automation Engineering Course\index.html'
    try:
        with open(path, 'rb') as f:
            data = f.read()
        
        # Remove null bytes if it's fake UTF-16
        data = data.replace(b'\x00', b'')
        
        # Decode as UTF-8, replacing errors
        content = data.decode('utf-8', errors='replace')
        
        # Remove common mojibake characters that appear when UTF-8 is misread
        # We'll use the hex values to be sure
        # ΓÇö (E2 80 94) -> —
        # ┬╖ (C2 B7) -> ·
        
        # But wait, if I just write it out as clean UTF-8, 
        # and the user's editor is set to UTF-8, it should work.
        
        # Let's fix the specific ones the user saw
        content = content.replace('ΓÇö', '—')
        content = content.replace('┬╖', '·')
        content = content.replace('Γû╢∩╕Å', '▶️')
        content = content.replace('≡ƒôä', '📄')
        
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print("Super clean complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    super_clean()
