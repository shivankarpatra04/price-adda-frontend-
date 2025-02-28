export interface NavItemProps {
    icon?: React.ReactNode;
    text: string;
    isActive?: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}
