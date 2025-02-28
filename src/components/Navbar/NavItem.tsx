import React from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import './navbar.css';

interface NavItemProps {
    icon: LucideIcon;
    text: string;
    onClick: () => void;
    isActive: boolean;
    isParentActive?: boolean;
    children?: React.ReactNode;
    hasDropdown?: boolean;
    isOpen?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
    text,
    icon: Icon,
    isActive,
    isParentActive,
    onClick,
    children,
    hasDropdown,
    isOpen
}) => {
    return (
        <div className="group">
            <div
                className={`nav-item ${isActive ? 'active' : ''} ${isParentActive ? 'parent-active' : ''}`}
                onClick={onClick}
            >
                <Icon className={`nav-item-icon ${isActive ? 'text-white' : ''}`} size={20} />
                <span className="nav-item-text ml-2">{text}</span>
                {hasDropdown && (
                    <ChevronDown
                        className={`ml-auto transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        size={16}
                        color="white"
                    />
                )}
            </div>
            {children}
        </div>
    );
};

export default NavItem;
