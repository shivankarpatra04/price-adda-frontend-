'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { menuItems, MenuItem, DropdownItem } from './menuData';
import NavItem from './NavItem';
import Dropdown from './Dropdown';
import './navbar.css';

interface NavbarProps {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const isParentOfActiveItem = useCallback((route: MenuItem) => {
        return route.dropdownItems?.some((item: DropdownItem) => item.key === activeTab);
    }, [activeTab]);

    const handleMenuItemClick = useCallback((key: string) => {
        const clickedItem = menuItems.find((item: MenuItem) => item.key === key);

        if (openDropdown && openDropdown !== key) {
            setOpenDropdown(null);
        }

        if (clickedItem?.dropdownItems?.length) {
            setOpenDropdown(prevState => prevState === key ? null : key);
        } else {
            setOpenDropdown(null);
        }

        setActiveTab(key);
    }, [setActiveTab, openDropdown]);

    const isItemActive = useCallback((route: MenuItem) => {
        if (route.dropdownItems?.length) {
            return openDropdown === route.key || isParentOfActiveItem(route);
        }
        return activeTab === route.key;
    }, [openDropdown, activeTab, isParentOfActiveItem]);

    const renderedRoutes = useMemo(() => menuItems.map((route) => (
        <div key={route.key} className="relative">
            <NavItem
                icon={route.icon}
                text={route.text}
                isActive={isItemActive(route)}
                isParentActive={isParentOfActiveItem(route)}
                onClick={() => handleMenuItemClick(route.key)}
                hasDropdown={route.dropdownItems?.length > 0}
                isOpen={openDropdown === route.key}
            />
            {route.dropdownItems && openDropdown === route.key && (
                <div className="dropdown-menu">
                    <Dropdown
                        items={route.dropdownItems}
                        isVisible={true}
                        activeItem={activeTab}
                        parentKey={route.key}
                        onItemClick={(key) => {
                            setActiveTab(key);
                        }}
                    />
                </div>
            )}
        </div>
    )), [activeTab, openDropdown, handleMenuItemClick, isItemActive, isParentOfActiveItem]);

    return (
        <nav className="navbar">
            <div className="w-full">
                <div className="flex flex-col space-y-2">
                    {renderedRoutes}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
