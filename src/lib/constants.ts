import { LineChart, Megaphone, PenSquare, Target, Code, LucideIcon, Palette, Video, Landmark } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  isExternal?: boolean;
};

type Service = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  icon: LucideIcon;
  image: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  category: 'Web Development' | 'Social Media Management' | 'Branding & Design' | 'SEO' | 'Content Marketing' | 'Ads Service' | 'Keuangan';
  description: string;
  image: string;
  imageHint: string;
  link?: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/about', label: 'About Us' },
  { href: '/career', label: 'Career' },
];

export const SERVICES: Service[] = [
  {
    slug: 'search-engine-optimization',
    title: 'SEO',
    description: 'Boost your visibility on search engines and attract organic traffic.',
    longDescription: "Our SEO strategies go beyond keywords. We focus on building a strong online foundation for your brand, driving qualified leads to your website. We analyze your market, optimize your site's technical performance, and create high-quality content that resonates with both users and search engines.",
    benefits: [
      "Increased organic search visibility",
      "Higher quality lead generation",
      "Improved brand credibility and trust",
      "Measurable and sustainable results"
    ],
    icon: LineChart,
    image: 'vworks-seo',
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    description: 'Engage your audience and build a strong brand presence on social media.',
    longDescription: "We create and manage impactful social media campaigns that foster community and drive engagement. From content creation to audience interaction, we handle all aspects of your social media to build a loyal following and convert followers into customers.",
    benefits: [
      "Enhanced brand awareness and reach",
      "Direct engagement with your target audience",
      "Increased website traffic from social platforms",
      "Valuable insights into customer behavior"
    ],
    icon: Megaphone,
    image: 'vworks-smm',
  },
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    description: 'Tell your story and provide value with compelling, high-quality content.',
    longDescription: "Content is king, and we are the kingmakers. Our team of writers and strategists develops compelling content that educates, entertains, and inspires your audience. We create blog posts, articles, videos, and more to establish your authority and drive conversions.",
    benefits: [
      "Establishes your brand as an industry leader",
      "Builds lasting relationships with your audience",
      "Improves SEO performance and organic traffic",
      "Supports all other digital marketing efforts"
    ],
    icon: PenSquare,
    image: 'vworks-content',
  },
  {
    slug: 'paid-advertising',
    title: 'Paid Advertising',
    description: 'Get immediate results and target specific audiences with paid ad campaigns.',
    longDescription: "Our data-driven paid advertising campaigns are designed for maximum ROI. We utilize platforms like Google Ads and social media advertising to reach your ideal customers at the right time, with the right message, ensuring every dollar of your ad spend is optimized for performance.",
    benefits: [
      "Immediate and highly targeted traffic",
      "Full control over your budget and ad spend",
      "A/B testing for continuous optimization",
      "Detailed performance tracking and reporting"
    ],
    icon: Target,
    image: 'vworks-ads',
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    description: 'Create a fast, responsive, and user-friendly website that converts visitors.',
    longDescription: "Your website is your digital storefront. We build beautiful, responsive, and high-performing websites that provide an exceptional user experience. From e-commerce platforms to corporate sites, we ensure your website is a powerful tool for business growth.",
    benefits: [
      "A professional and modern online presence",
      "Optimized for all devices (mobile-first)",
      "Fast loading speeds for better user experience and SEO",
      "Easy-to-manage content management systems"
    ],
    icon: Code,
    image: 'vworks-webdev',
  },
];

type PricingPackage = {
  name: string;
  title: string;
  price: string;
  description: string;
  includes: string;
  excludes: string;
};

type PricingCategory = {
  category: string;
  icon: LucideIcon;
  packages: PricingPackage[];
};

export const PRICING_DATA: PricingCategory[] = [
    {
        category: 'Web Development',
        icon: Code,
        packages: [
            {
                name: 'Vworks Web Dev',
                title: 'Landing Page',
                price: 'Rp 1.000.000',
                description: 'Termasuk Domain & Hosting (1 Tahun)',
                includes: 'Setup Domain/Hosting, Desain UI/UX, Mobile Responsive',
                excludes: 'Perpanjangan tahun ke-2, Maintenance konten rutin'
            },
            {
                name: 'Vworks Corp Web',
                title: 'Website Corporation',
                price: 'Rp 2.500.000',
                description: 'Profil perusahaan lengkap & desain responsif',
                includes: 'Integrasi Sosmed, SEO Basic, Email Bisnis',
                excludes: 'Pembuatan aset foto/video produk'
            }
        ]
    },
    {
        category: 'Digital Ads Service',
        icon: Target,
        packages: [
            {
                name: 'Vworks Ads',
                title: 'Multi-Platform Ads',
                price: 'Rp 300.000',
                description: 'TikTok, FB, Shopee, Marketplace, Google',
                includes: 'Riset Audience, Setup Campaign, Monitoring',
                excludes: 'Saldo Iklan (Ad Spend), Materi konten (Creative)'
            }
        ]
    },
    {
        category: 'Social Media Management',
        icon: Megaphone,
        packages: [
            {
                name: 'Vworks Social Starter',
                title: 'Paket Basic (20 Content)',
                price: 'Rp 600.000',
                description: '20 Feed Instagram/FB per bulan',
                includes: 'Desain Konten, Copywriting, Hashtag Research',
                excludes: 'Balas komentar/DM, Saldo Ads'
            },
            {
                name: 'Vworks Social Pro',
                title: 'Paket Premium (40 Content)',
                price: 'Rp 1.000.000',
                description: '40 Feed Instagram/FB per bulan',
                includes: 'Desain Konten, Admin Posting, Copywriting',
                excludes: 'Photoshoot produk (jika di luar kota)'
            }
        ]
    },
    {
        category: 'Branding & Design',
        icon: Palette,
        packages: [
            {
                name: 'Vworks Brand Pro',
                title: 'Logo & Company Profile',
                price: 'Rp 750.000',
                description: 'Paket identitas visual lengkap (Bundle)',
                includes: 'File Master (AI/PDF/PNG), Brand Guidelines',
                excludes: 'Cetak fisik (Percetakan)'
            }
        ]
    },
    {
        category: 'SEO & Artikel',
        icon: LineChart,
        packages: [
            {
                name: 'Vworks SEO Starter',
                title: 'SEO Optimization Basic (30 Art)',
                price: 'Rp 700.000',
                description: 'Harga Promo (Normal: 850.000)',
                includes: 'Riset Keyword, Artikel 500+ kata, Posting',
                excludes: 'Backlink berbayar (PBN), Perbaikan teknis web'
            },
            {
                name: 'Vworks SEO Pro',
                title: 'SEO Optimization Premium (60 Art)',
                price: 'Rp 1.300.000',
                description: 'Harga Promo (Normal: 1.700.000)',
                includes: 'Riset Keyword, Optimasi On-Page, Laporan bulanan',
                excludes: 'Maintenance server website'
            }
        ]
    },
    {
        category: 'Content Creator',
        icon: Video,
        packages: [
            {
                name: 'Video Keranjang Kuning',
                title: 'Video Keranjang Kuning',
                price: 'Rp 40.000 /konten',
                description: 'Produk dikirim pelanggan (biaya ditanggung pelanggan)',
                includes: 'Editing Video, Talent (Internal), Scripting',
                excludes: 'Biaya kirim & balik produk'
            },
            {
                name: 'Vworks Tiktok Branding',
                title: 'Video Hiburan/Branding',
                price: 'Rp 50.000 /konten',
                description: 'Fokus pada engagement dan kreativitas',
                includes: 'Konsep Kreatif, Editing, Audio Tren',
                excludes: 'Biaya kirim & balik produk, Talent eksternal'
            }
        ]
    },
    {
        category: 'Keuangan',
        icon: Landmark,
        packages: [
            {
                name: 'Vworks Finpro',
                title: 'Akuntansi dan Perpajakan',
                price: 'Rp 2.000.000/bulan',
                description: 'Layanan Pengelolaan transaksi keuangan dan pelaporan pajak',
                includes: 'Laporan laba rugi dan Neraca',
                excludes: ''
            },
            {
                name: 'Vworks Finpro Lite',
                title: 'Akuntansi',
                price: 'Rp 1.000.000/bulan',
                description: 'Layanan Pengelolaan transaksi keuangan',
                includes: '',
                excludes: ''
            }
        ]
    }
];

export const PORTFOLIO_CATEGORIES = [
  { slug: 'web-development', name: 'Web Development', icon: Code },
  { slug: 'social-media-management', name: 'Social Media Management', icon: Megaphone },
  { slug: 'branding-design', name: 'Branding & Design', icon: Palette },
  { slug: 'seo', name: 'SEO', icon: LineChart },
  { slug: 'content-marketing', name: 'Content Marketing', icon: PenSquare },
  { slug: 'ads-service', name: 'Ads Service', icon: Target },
  { slug: 'keuangan', name: 'Keuangan', icon: Landmark },
];


export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: 'corporate-web-revamp',
    title: 'Corporate Website Revamp',
    category: 'Web Development',
    description: 'A complete overhaul of a corporate website to improve user experience, mobile responsiveness, and lead generation.',
    image: 'https://picsum.photos/seed/portfolio1/500/400',
    imageHint: 'corporate website',
  },
  {
    slug: 'smm-campaign-fashion',
    title: 'Fashion Brand SMM Campaign',
    category: 'Social Media Management',
    description: 'Managed a 3-month social media campaign for a new fashion brand, resulting in a 200% increase in followers and high engagement rates.',
    image: 'https://picsum.photos/seed/portfolio2/500/400',
    imageHint: 'fashion social media',
  },
  {
    slug: 'startup-branding-kit',
    title: 'Tech Startup Branding Kit',
    category: 'Branding & Design',
    description: 'Developed a full branding package for a tech startup, including logo design, color palette, typography, and brand guidelines.',
    image: 'https://picsum.photos/seed/portfolio3/500/400',
    imageHint: 'startup branding',
  },
  {
    slug: 'ecommerce-store-launch',
    title: 'E-commerce Store Launch',
    category: 'Web Development',
    description: 'Built a full-featured e-commerce store on Shopify, including custom theme development and payment gateway integration.',
    image: 'https://picsum.photos/seed/portfolio4/500/400',
    imageHint: 'ecommerce store',
  },
   {
    slug: 'restaurant-logo-design',
    title: 'Restaurant Logo & Menu Design',
    category: 'Branding & Design',
    description: 'Created a memorable logo and a beautifully designed menu for a new local restaurant, enhancing its brand identity.',
    image: 'https://picsum.photos/seed/portfolio5/500/400',
    imageHint: 'restaurant menu',
  },
  {
    slug: 'health-app-social-media',
    title: 'Health App Social Content',
    category: 'Social Media Management',
    description: 'Produced engaging video and static content for a health and wellness app, growing their Instagram presence significantly.',
    image: 'https://picsum.photos/seed/portfolio6/500/400',
    imageHint: 'health app',
  },
  {
    slug: 'local-business-seo',
    title: 'Local Business SEO Success',
    category: 'SEO',
    description: 'Improved local search rankings for a small business, driving a 50% increase in foot traffic through targeted SEO strategies.',
    image: 'https://picsum.photos/seed/portfolio7/500/400',
    imageHint: 'local business',
  },
  {
    slug: 'b2b-content-strategy',
    title: 'B2B Content Strategy',
    category: 'Content Marketing',
    description: 'Developed a comprehensive content marketing strategy for a B2B SaaS company, increasing organic leads by 75%.',
    image: 'https://picsum.photos/seed/portfolio8/500/400',
    imageHint: 'content strategy',
  },
  {
    slug: 'google-ads-campaign',
    title: 'Google Ads Campaign for Retail',
    category: 'Ads Service',
    description: 'Managed a high-budget Google Ads campaign for an online retailer, achieving a 5X return on ad spend (ROAS).',
    image: 'https://picsum.photos/seed/portfolio9/500/400',
    imageHint: 'ads campaign',
  },
  {
    slug: 'financial-reporting-system',
    title: 'Financial Reporting System',
    category: 'Keuangan',
    description: 'Implemented a streamlined financial reporting process for a mid-sized company, improving data accuracy and efficiency.',
    image: 'https://picsum.photos/seed/portfolio10/500/400',
    imageHint: 'financial report',
  },
];
