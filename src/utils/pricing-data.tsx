import { Building2, Gem, Users } from "lucide-react"

interface Plan {
    name: string
    icon: React.ReactNode
    features: string[]
}

interface PricingPlans {
    "logo": Plan[]
    "informative-website": Plan[]
    "ecommerce-website": Plan[]
    "seo": Plan[]
}


export const pricingPlans: PricingPlans = {
    "logo": [
        {
            name: "LOGO SPECIAL",
            icon: <Users className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "4 Unique Logo Concepts",
                "Dedicated Logo Designer",
                "4 Revisions",
                "Grayscale Version",
                "Free Custom Icon",
                "JPEG Format",
                "Fast Delivery (24-48 Hours)",
                "100% Satisfaction & Ownership",
            ],
        },
        {
            name: "LOGO PLUS",
            icon: <Building2 className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "8 Unique Logo Concepts",
                "Industry-Specific Designer",
                "Unlimited Revisions",
                "Stationery & Email Signature",
                "Free Icon",
                "Multiple Formats (JPEG, PSD, AI, PNG, etc.)",
                "Fast Delivery (24-48 Hours)",
                "100% Satisfaction & Ownership",
            ],
        },
        {
            name: "Enterprise Plan",
            icon: <Gem className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "Unlimited Unique Logo Concepts",
                "Industry-Specific Designer",
                "Unlimited Revisions",
                "Stationery, Email Signature & Social Media Designs",
                "Free Icon",
                "Multiple Formats (JPEG, PSD, AI, PNG, etc.)",
                "Fast Delivery (24-48 Hours)",
                "100% Satisfaction & Ownership",
            ],
        },
    ],
    "informative-website": [
        {
            name: "BASIC WEBSITE",
            icon: <Users className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "Informative Website",
                "Industry-Specific Designer",
                "Custom Homepage (2 Concepts)",
                "3-5 Inner Pages",
                "Cross-Browser Compatibility",
                "Search Engine Submission",
                "Google Sitemap",
                "Unlimited Revisions",
                "Responsive & Unique Design",
                "After-Sales Support",
                "100% Satisfaction & Ownership",
            ],
        },
        {
            name: "STANDARD WEBSITE",
            icon: <Building2 className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "Informative Website",
                "Industry-Specific Designer",
                "Custom Homepage (2 Concepts)",
                "8-10 Inner Pages",
                "CMS/Admin Panel Support",
                "Search Engine Submission & Google Sitemap",
                "Cross-Browser Compatibility",
                "Unlimited Revisions",
                "Complete Deployment",
                "30 Days Free Support",
                "100% Satisfaction & Ownership",
            ],
        },
        {
            name: "ENTERPRISE WEBSITE",
            icon: <Gem className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "Dynamic, Informative Website",
                "Industry-Specific Designer",
                "Custom Homepage (4 Concepts)",
                "10-15 Inner Pages",
                "Cross-Platform Responsive",
                "Online Payment & Dynamic Forms",
                "Signup & Newsfeed Integration",
                "Search Engine Submission & Google Sitemap",
                "Parallax Scrolling",
                "Complete Deployment",
                "60 Days Free Support",
                "CMS Training Manual",
                "24/7 Customer Support",
                "Unlimited Revisions",
                "100% Satisfaction & Ownership",
            ],
        },
    ],
    "ecommerce-website": [
        {
            name: "E-COMMERCE BASIC",
            icon: <Users className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "Custom Designed Homepage (2x Concepts)",
                "Up to 5 Custom Inner Pages",
                "Up to 150 Products & 7 Categories",
                "Cross-Platform & Cross-Browser Compatibility",
                "Dynamic Website with Easy Product Search",
                "Product Reviews & Shopping Cart Integration",
                "Search Engine Submission & Google-Friendly Sitemap",
                "Payment Module Integration",
                "30 Days Free Post-Launch Support",
                "3 Revisions & Complete Deployment",
                "100% Ownership, Satisfaction & Unique Design Guarantee",
            ],
        },
        {
            name: "E-COMMERCE PLUS",
            icon: <Building2 className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "Custom Designed Homepage (2x Concepts)",
                "Up to 10 Custom Inner Pages",
                "Up to 350 Products & 15 Categories",
                "CMS & Product Sorting (Newest, Best Seller, etc.)",
                "Social Media & Live Chat Integration",
                "Newsletter Signup & Easy Product Search",
                "Product Reviews & Shopping Cart Integration",
                "Search Engine Submission & Google-Friendly Sitemap",
                "Sales & Inventory Management",
                "30 Days Free Post-Launch Support",
                "Unlimited Revisions & Complete Deployment",
                "100% Ownership, Satisfaction & Unique Design Guarantee",
            ],
        },
        {
            name: "E-COMMERCE ENTERPRISE",
            icon: <Gem className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "Custom Designed Homepage (4x Concepts)",
                "Up to 15 Custom Inner Pages",
                "Up to 650 Products & Unlimited Categories",
                "Professional Design with Sliding Banners & Premium Stock Photos",
                "Multiple Product Variations & Advanced Filtering",
                "User-Friendly Navigation & SEO-Friendly Content",
                "Shopping Cart, Multi-Currency & Payment Integration",
                "Product Showcase, Wishlist, & Discount Coupons",
                "Shipping Methods & Tax Calculator",
                "Live Chat, Social Media Integration & Blog Page",
                "Search Engine Submission & Google-Friendly Sitemap",
                "Fast Load Time & 60 Days Free Post-Launch Support",
                "Unlimited Revisions, Complete Deployment & Source Files",
                "100% Ownership, Satisfaction & Unique Design Guarantee",
            ],
        },
    ],
    "seo": [
        {
            name: "BASIC",
            icon: <Users className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "10 Keywords Optimization",
                "4 Keywords in top 10",
                "Search Engine Submissions",
                "2 Blogs Writing",
                "4 Blog Posting Links",
                "10 Blogs Social Bookmarking Links",
                "2 Back Links"
            ]
        },
        {
            name: "STANDARD",
            icon: <Building2 className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "25 Keywords Optimization",
                "10 Keywords in Top 10",
                "Search Engine Submissions",
                "6 Blogs Writing",
                "12 Blog Posting Links",
                "20 Blogs Social Bookmarking Links",
                "4 Back Links"
            ]
        },
        {
            name: "PROFESSIONAL",
            icon: <Gem className="w-8 h-8 text-[#49C9F2]" />,
            features: [
                "50 Keywords Optimization",
                "20 Keywords in the Top 10",
                "14 Blogs Writing",
                "28 Blog Posting Links",
                "30 Blogs Social Bookmarking Links",
                "8 Back Links",
                "4 Guest Blogging Links"
            ]
        }
    ]
}