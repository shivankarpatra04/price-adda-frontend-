'use client';
import React, { useState, useCallback } from 'react';
import Navbar from './Navbar/Navbar';
import PageContainer from './PageContainer';

const Navigation = () => {
    const [activeTab, setActiveTab] = useState<string>('home');

    const handleTabChange = useCallback((newTab: string) => {
        console.log('Navigation: handleTabChange called with:', newTab);
        setActiveTab(newTab);
    }, []);

    return (
        <div className="flex min-h-screen">
            <div className="w-64 min-h-screen border-r"> {/* Added fixed width for left sidebar */}
                <Navbar
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                />
            </div>
            <div className="flex-1"> {/* Content area takes remaining width */}
                <PageContainer activeTab={activeTab} />
            </div>
        </div>
    );
};

export default Navigation;
