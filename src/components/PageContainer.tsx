'use client';
import React, { useCallback, useEffect } from 'react';

// Dashboard
import Metrics from './Pages/Dashboard/Metrics';
import RecentActivities from './Pages/Dashboard/RecentActivities';

// Pages
import StaticPages from './Pages/ManagePages/StaticPages';
import MetaContent from './Pages/ManagePages/MetaContent';
import CMS from './Pages/ManagePages/CMS';

// Retailers
import AddRetailer from './Pages/Retailers/AddRetailer';
import UploadRetailer from './Pages/Retailers/UploadRetailer';
import ViewRetailer from './Pages/Retailers/ViewRetailer';
import UploadReport from './Pages/Retailers/UploadReport';
import ViewReport from './Pages/Retailers/ViewReport';

// Coupons
import AddCoupon from './Pages/Coupons/AddCoupon';
import ViewCoupon from './Pages/Coupons/ViewCoupon';
import ReportedIssues from './Pages/Coupons/ReportedIssues';

// Category
import ManageCategories from './Pages/Category/ManageCategories';

// Cashback
import PendingCashback from './Pages/Cashback/PendingCashback';
import CompletedCashback from './Pages/Cashback/CompletedCashback';
import CancelledCashback from './Pages/Cashback/CancelledCashback';
import MissingCashback from './Pages/Cashback/MissingCashback';

// Rewards
import PendingRewards from './Pages/Rewards/PendingRewards';
import CompletedRewards from './Pages/Rewards/CompletedRewards';
import CancelledRewards from './Pages/Rewards/CancelledRewards';
import MissingRewards from './Pages/Rewards/MissingRewards';
import RewardStores from './Pages/Rewards/RewardStores';

// Marketing
import BannerManagement from './Pages/Marketing/BannerManagement';
import EmailTemplates from './Pages/Marketing/EmailTemplates';
import Subscriber from './Pages/Marketing/Subscriber';
import Advertisement from './Pages/Marketing/Advertisement';
import DealoftheDay from './Pages/Marketing/DealoftheDay';
import AffiliateNetwork from './Pages/Marketing/AffiliateNetwork';

// Users
import VerifiedUsers from './Pages/Users/VerifiedUsers';
import UnverifiedUsers from './Pages/Users/UnverifiedUsers';
import SubAdminManagement from './Pages/Users/SubAdminManagement';

// Wallet
import WalletTransactions from './Pages/Wallet/WalletTransactions';
import WalletRecharge from './Pages/Wallet/WalletRecharge';
import ShoppingVouchers from './Pages/Wallet/ShoppingVouchers';
import BankTransfer from './Pages/Wallet/BankTransfer';

// Engagement
import Recommendations from './Pages/Engagement/Recommendations';
import LoyaltyProgram from './Pages/Engagement/LoyaltyProgram';
import ReviewsRatings from './Pages/Engagement/ReviewsRatings';
import PollsSurveys from './Pages/Engagement/PollsSurveys';

// Search
import AdvancedFilters from './Pages/Search/AdvancedFilters';
import AutocompleteSearch from './Pages/Search/AutocompleteSearch';
import VoiceSearch from './Pages/Search/VoiceSearch';

// Social
import SocialMedia from './Pages/Social/SocialMedia';
import ReferralProgram from './Pages/Social/ReferralProgram';
import PushNotifications from './Pages/Social/PushNotifications';

// Security
import ManageIP from './Pages/Security/ManageIP';
import GDPRCompliance from './Pages/Security/GDPRCompliance';

// Support
import LiveChat from './Pages/Support/LiveChat';
import HelpCenter from './Pages/Support/HelpCenter';
import Ticketing from './Pages/Support/Ticketing';
import Enquiry from './Pages/Support/Enquiry';

// Analytics
import AdvancedAnalytics from './Pages/Analytics/AdvancedAnalytics';
import RealTimeData from './Pages/Analytics/RealTimeData';
import ClickHistory from './Pages/Analytics/ClickHistory';

interface PageContainerProps {
    activeTab: string;
}

const PageContainer: React.FC<PageContainerProps> = React.memo(({ activeTab }) => {
    useEffect(() => {
        console.log('PageContainer: Rendering content for:', activeTab);
    }, [activeTab]);

    const renderPage = useCallback(() => {
        console.log('renderPage called with activeTab:', activeTab);

        switch (activeTab) {
            // Dashboard
            case 'metrics':
                return <Metrics />;
            case 'recent-activities':
                return <RecentActivities />;

            // Pages
            case 'static-pages':
                return <StaticPages />;
            case 'meta-content':
                return <MetaContent />;
            case 'cms':
                return <CMS />;

            // Retailers
            case 'add-retailer':
                return <AddRetailer />;
            case 'upload-retailer':
                return <UploadRetailer />;
            case 'view-retailer':
                return <ViewRetailer />;
            case 'upload-report':
                return <UploadReport />;
            case 'view-report':
                return <ViewReport />;

            // Coupons
            case 'add-coupon':
                return <AddCoupon />;
            case 'view-coupon':
                return <ViewCoupon />;
            case 'reported-issues':
                return <ReportedIssues />;

            // Category
            case 'manage-categories':
                return <ManageCategories />;

            // Cashback
            case 'pending-cashback':
                return <PendingCashback />;
            case 'completed-cashback':
                return <CompletedCashback />;
            case 'cancelled-cashback':
                return <CancelledCashback />;
            case 'missing-cashback':
                return <MissingCashback />;

            // Rewards section for PageContainer.tsx switch statement
            case 'pending-rewards':
                return <PendingRewards />;
            case 'completed-rewards':
                return <CompletedRewards />;
            case 'cancelled-rewards':
                return <CancelledRewards />;
            case 'missing-rewards':
                return <MissingRewards />;
            case 'reward-stores':
                return <RewardStores />;


            // Marketing
            case 'banner':
                return <BannerManagement />;
            case 'email-templates':
                return <EmailTemplates />;
            case 'subscriber':
                return <Subscriber />;
            case 'advertisement':
                return <Advertisement />;
            case 'deal-of-the-day':
                return <DealoftheDay />;
            case 'affiliate-network':
                return <AffiliateNetwork />;

            // Users
            case 'verified-users':
                return <VerifiedUsers />;
            case 'unverified-users':
                return <UnverifiedUsers />;
            case 'subadmin':
                return <SubAdminManagement />;

            // Wallet
            case 'wallet-transactions':
                return <WalletTransactions />;
            case 'wallet-recharge':
                return <WalletRecharge />;
            case 'shopping-vouchers':
                return <ShoppingVouchers />;
            case 'bank-transfer':
                return <BankTransfer />;

            // Engagement
            case 'recommendations':
                return <Recommendations />;
            case 'loyalty-program':
                return <LoyaltyProgram />;
            case 'reviews-ratings':
                return <ReviewsRatings />;
            case 'polls-surveys':
                return <PollsSurveys />;

            // Search
            case 'filters':
                return <AdvancedFilters />;
            case 'autocomplete':
                return <AutocompleteSearch />;
            case 'voice-search':
                return <VoiceSearch />;

            // Social
            case 'social-media':
                return <SocialMedia />;
            case 'referral':
                return <ReferralProgram />;
            case 'push-notifications':
                return <PushNotifications />;

            // Security
            case 'manage-ip':
                return <ManageIP />;
            case 'gdpr':
                return <GDPRCompliance />;

            // Support
            case 'live-chat':
                return <LiveChat />;
            case 'help-center':
                return <HelpCenter />;
            case 'ticketing':
                return <Ticketing />;
            case 'enquiry':
                return <Enquiry />;

            // Analytics
            case 'advanced-analytics':
                return <AdvancedAnalytics />;
            case 'real-time-data':
                return <RealTimeData />;
            case 'click-history':
                return <ClickHistory />;

            default:
                return <div>Select a menu item</div>;
        }
    }, [activeTab]);

    return (
        <div className="mt-16 p-4 w-full">
            {renderPage()}
        </div>
    );
});

PageContainer.displayName = 'PageContainer';

export default PageContainer;
