import { Code2, FileText, Folder, ImageIcon, Sparkles, Video, Volume2 } from 'lucide-react';
import type { ToolCategoryDefinition } from '../../../types/tool';

interface CategoryIconProps {
  iconKey: ToolCategoryDefinition['iconKey'];
  className?: string;
}

export const CategoryIcon = ({ iconKey, className }: CategoryIconProps) => {
  const icons = {
    image: ImageIcon,
    'file-text': FileText,
    video: Video,
    audio: Volume2,
    sparkles: Sparkles,
    code: Code2,
    folder: Folder,
  } as const;

  const Icon = icons[iconKey];
  return <Icon className={className} />;
};
