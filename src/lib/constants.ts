import { LineChart, Megaphone, PenSquare, Target, Code, LucideIcon, Bot } from 'lucide-react';

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

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
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
