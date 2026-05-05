import html.parser
import sys

class HTMLHealthCheck(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        # Tags that don't need closing
        if tag in ['img', 'br', 'hr', 'meta', 'link', 'input']:
            return
        self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if not self.stack:
            self.errors.append(f"Unexpected end tag </{tag}> at {self.getpos()}")
            return
        
        expected, pos = self.stack.pop()
        if expected != tag:
            self.errors.append(f"Expected </{expected}> (opened at {pos}), but found </{tag}> at {self.getpos()}")

def check_file():
    path = r'c:\Users\ritji\Desktop\AI Automation Engineering Course\index.html'
    try:
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    parser = HTMLHealthCheck()
    parser.feed(content)
    
    if parser.stack:
        for tag, pos in parser.stack:
            print(f"Unclosed tag <{tag}> opened at {pos}")
    
    if parser.errors:
        for error in parser.errors:
            print(error)
            
    if not parser.stack and not parser.errors:
        print("HTML structure looks valid.")

if __name__ == "__main__":
    check_file()
