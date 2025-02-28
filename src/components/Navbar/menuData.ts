import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
    Home,
    FileText,
    Users,
    ShoppingBag,
    BarChart2,
    Wallet,
    CreditCard,
    Tag,
    Grid,
    Gift,
    Mail,
    Settings,
    MessageSquare,
    Bell,
    Search,
    Share2,
    Shield,
    Headphones,
    Megaphone
} from 'lucide-react';

export interface DropdownItem {
    key: string;
    text: string;
}

interface MenuItem {
    key: string;
    text: string;
    icon: LucideIcon;
    dropdownItems: Array<{
        key: string;
        text: string;
    }>;
}

export const menuItems: MenuItem[] = [
    {
        key: 'dashboard',
        text: 'Dashboard',
        icon: Home,
        dropdownItems: [
            { key: 'metrics', text: 'Key Metrics' },
            { key: 'recent-activities', text: 'Recent Activities' }
        ],
    },
    {
        key: 'manage-pages',
        text: 'Manage Pages',
        icon: FileText,
        dropdownItems: [
            { key: 'static-pages', text: 'Static Pages' },
            { key: 'meta-content', text: 'Meta Content' },
            { key: 'cms', text: 'CMS' }
        ],
    },
    {
        key: 'retailers',
        text: 'Retailers',
        icon: ShoppingBag,
        dropdownItems: [
            { key: 'add-retailer', text: 'Add Retailer' },
            { key: 'upload-retailer', text: 'Upload Retailer' },
            { key: 'view-retailer', text: 'View Retailer' },
            { key: 'upload-report', text: 'Upload Report' },
            { key: 'view-report', text: 'View Report' }
        ],
    },
    {
        key: 'coupons',
        text: 'Coupons',
        icon: Tag,
        dropdownItems: [
            { key: 'add-coupon', text: 'Add Coupon' },
            { key: 'view-coupon', text: 'View Coupon' },
            { key: 'reported-issues', text: 'Reported Issues' }
        ],
    },
    {
        key: 'category',
        text: 'Category',
        icon: Grid,
        dropdownItems: [
            { key: 'manage-categories', text: 'Manage Categories' }
        ],
    },
    {
        key: 'cashback',
        text: 'Cashback',
        icon: Wallet,
        dropdownItems: [
            { key: 'pending-cashback', text: 'Pending Cashback' },
            { key: 'completed-cashback', text: 'Completed Cashback' },
            { key: 'cancelled-cashback', text: 'Cancelled Cashback' },
            { key: 'missing-cashback', text: 'Missing Cashback' }
        ],
    },
    {
        key: 'rewards',
        text: 'Rewards',
        icon: Gift,
        dropdownItems: [
            { key: 'pending-rewards', text: 'Pending Rewards' },
            { key: 'completed-rewards', text: 'Completed Rewards' },
            { key: 'cancelled-rewards', text: 'Cancelled Rewards' },
            { key: 'missing-rewards', text: 'Missing Rewards' },
            { key: 'reward-stores', text: 'View Reward Stores' }
        ],
    },
    {
        key: 'users',
        text: 'Users',
        icon: Users,
        dropdownItems: [
            { key: 'verified-users', text: 'Verified Users' },
            { key: 'unverified-users', text: 'Unverified Users' },
            { key: 'subadmin', text: 'SubAdmin Management' }
        ],
    },
    {
        key: 'wallet',
        text: 'Wallet & Vouchers',
        icon: CreditCard,
        dropdownItems: [
            { key: 'wallet-transactions', text: 'Wallet' },
            { key: 'wallet-recharge', text: 'Wallet Recharge' },
            { key: 'shopping-vouchers', text: 'Shopping Vouchers' },
            { key: 'bank-transfer', text: 'Bank Transfer' }
        ],
    },
    {
        key: 'marketing',
        text: 'Marketing',
        icon: Megaphone,
        dropdownItems: [
            { key: 'banner', text: 'Banner Management' },
            { key: 'email-templates', text: 'Email Templates' },
            { key: 'subscriber', text: 'Subscriber' },
            { key: 'advertisement', text: 'Advertisement' },
            { key: 'deal-of-the-day', text: 'Deal of the Day' },
            { key: 'affiliate-network', text: 'Affiliate Networks' }
        ],
    },
    {
        key: 'engagement',
        text: 'User Engagement',
        icon: Bell,
        dropdownItems: [
            { key: 'recommendations', text: 'Personalized Recommendations' },
            { key: 'loyalty-program', text: 'Loyalty Program' },
            { key: 'reviews-ratings', text: 'User Reviews and Ratings' },
            { key: 'polls-surveys', text: 'Interactive Polls and Surveys' }
        ],
    },
    {
        key: 'search',
        text: 'Advanced Search',
        icon: Search,
        dropdownItems: [
            { key: 'filters', text: 'Advanced Filters' },
            { key: 'autocomplete', text: 'Autocomplete Search' },
            { key: 'voice-search', text: 'Voice Search' }
        ],
    },
    {
        key: 'social',
        text: 'Social Features',
        icon: Share2,
        dropdownItems: [
            { key: 'social-media', text: 'Social Media Integration' },
            { key: 'referral', text: 'Referral Program' },
            { key: 'push-notifications', text: 'Push Notifications' }
        ],
    },
    {
        key: 'security',
        text: 'Security',
        icon: Shield,
        dropdownItems: [
            { key: 'manage-ip', text: 'Manage IP' },
            { key: 'gdpr', text: 'GDPR Compliance' }
        ],
    },
    {
        key: 'support',
        text: 'Customer Support',
        icon: Headphones,
        dropdownItems: [
            { key: 'live-chat', text: 'Live Chat Support' },
            { key: 'help-center', text: 'Help Center' },
            { key: 'ticketing', text: 'Ticketing System' },
            { key: 'enquiry', text: 'Enquiry' }
        ],
    },
    {
        key: 'analytics',
        text: 'Analytics',
        icon: BarChart2,
        dropdownItems: [
            { key: 'advanced-analytics', text: 'Advanced Analytics' },
            { key: 'real-time-data', text: 'Real-Time Data' },
            { key: 'click-history', text: 'Click History' }
        ],
    }
];
