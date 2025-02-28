import React from 'react';
import { DropdownItem } from './menuData';
import './navbar.css';


interface DropdownProps {
    items: DropdownItem[];
    isVisible: boolean;
    activeItem: string;
    parentKey: string;
    onItemClick: (key: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, isVisible, activeItem, parentKey, onItemClick }) => {
    if (!isVisible) return null;

    return (
        <div className="dropdown">
            {items.map((item) => (
                <div
                    key={item.key}
                    onClick={() => onItemClick(item.key)}
                    className={`dropdown-item ${activeItem === item.key ? 'active' : ''}`}
                >
                    {item.text}
                </div>
            ))}
        </div>
    );
};



export default Dropdown;