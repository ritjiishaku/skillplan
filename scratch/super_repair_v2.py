import re

def repair_mojibake(content):
    # Mapping of common mojibake sequences to their intended characters
    # These are based on the observed patterns in the file
    replacements = {
        'dY??': '💻',
        'dY"-': '📖',
        'dY",': '📜',
        '- ,?': '🎬',
        'o.': '🧪',
        'dY" ': '🏗️',
        's\',?': '⚔️',
        'dY?3': '🐳',
        's': '⚡',
        'dYO': '🌲',
        'A': '·',
        '?"': '—',
        '?': '⏱',
        'dY?o?': '🧪',
        'dY"S': '📈',
        'dY+': '➕',
        '+"': '🏁',
        'dYZ"': '🎓',
        'dY?o?': '🧠',
        'dY>,?': '🛡️',
        'dYY': '📋',
        'dY"o': '📄',
        'dY?-,?': '📚',
        'dY c': '🎨',
        'sT,?': '🏗️',
        'dY""': '✍️',
        'dY"': '🔬',
        'dY ': '🧠',
        'dY -': '📺',
        'dY?o': '🧠',
        '-': '📺',
        'o': '🏁',
        ' ': '⏱',
        '?': '—',
        '': '·'
    }
    
    # Sort keys by length descending to match longest sequences first
    sorted_keys = sorted(replacements.keys(), key=len, reverse=True)
    
    for key in sorted_keys:
        content = content.replace(key, replacements[key])
        
    return content

def main():
    path = r'c:\Users\ritji\Desktop\AI Automation Engineering Course\index.html'
    try:
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        repaired = repair_mojibake(content)
        
        # Also fix the Phase separators
        repaired = re.sub(r'<!--  PHASE (\d)  -->', r'<!-- ═══════════════ PHASE \1 ═══════════════ -->', repaired)
        repaired = re.sub(r' \? \? \? \? \? \? \? \? \? \? \? \? \? \? \? (.*?)  \? \? \? \? \? \? \? \? \? \? \? \? \? \? \?', r'<!-- ═══════════════ \1 ═══════════════ -->', repaired)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(repaired)
        print("Repair complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
