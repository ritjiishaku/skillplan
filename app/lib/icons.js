import {
  Terminal, Cpu, Database, BookOpen, Play, Wrench, Zap, GitBranch,
  FileText, FolderOpen, Book, CheckCircle, Bot, Triangle, Sparkles,
  Moon, Sun, Info, AlertCircle, AlertTriangle, User, UserCheck,
  LogOut, Trash2,
} from 'lucide-react';

const map = {
  terminal: Terminal, cpu: Cpu, database: Database,
  'book-open': BookOpen, play: Play, wrench: Wrench, zap: Zap,
  'git-branch': GitBranch, 'file-text': FileText, 'folder-open': FolderOpen,
  book: Book, 'check-circle': CheckCircle, bot: Bot, triangle: Triangle,
  sparkles: Sparkles, moon: Moon, sun: Sun, info: Info,
  'alert-circle': AlertCircle, 'alert-triangle': AlertTriangle,
  user: User, 'user-check': UserCheck, 'log-out': LogOut, 'trash-2': Trash2,
};

export function Icon({ name, size = 16, className = '' }) {
  const Component = map[name];
  if (!Component) return null;
  return <Component size={size} className={className} />;
}
