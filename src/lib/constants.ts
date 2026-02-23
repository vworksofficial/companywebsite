import { LineChart, Megaphone, PenSquare, Target, Code, LucideIcon, Palette, Video, Landmark, Camera } from 'lucide-react';

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
  category: 'Web Development' | 'Social Media Management' | 'Branding & Design' | 'SEO' | 'Content Marketing' | 'Ads Service' | 'Keuangan & Pajak' | 'Foto Produk UMKM';
  description: string;
  image: string;
  imageHint: string;
  link?: string;
};

export type Article = {
  slug: string;
  title: string;
  category: 'Web Development' | 'Social Media Management' | 'Branding & Design' | 'SEO' | 'Content Marketing' | 'Ads Service' | 'Keuangan & Pajak';
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  date: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Beranda' },
  { href: '/services', label: 'Layanan' },
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/career', label: 'Karir' },
];

export const SERVICES: Service[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Buat situs web yang cepat, responsif, dan ramah pengguna yang dapat mengubah pengunjung.',
    longDescription: "Situs web Anda adalah etalase digital Anda. Kami membangun situs web yang indah, responsif, dan berkinerja tinggi yang memberikan pengalaman pengguna yang luar biasa. Dari platform e-commerce hingga situs perusahaan, kami memastikan situs web Anda adalah alat yang ampuh untuk pertumbuhan bisnis.",
    benefits: [
      "Kehadiran online yang profesional dan modern",
      "Dioptimalkan untuk semua perangkat (mobile-first)",
      "Kecepatan muat yang cepat untuk pengalaman pengguna dan SEO yang lebih baik",
      "Sistem manajemen konten yang mudah dikelola"
    ],
    icon: Code,
    image: 'vworks-webdev',
  },
  {
    slug: 'digital-ads-service',
    title: 'Digital Ads Service',
    description: 'Dapatkan hasil cepat dan targetkan audiens spesifik dengan kampanye iklan berbayar.',
    longDescription: "Kampanye iklan berbayar berbasis data kami dirancang untuk ROI maksimum. Kami memanfaatkan platform seperti Google Ads dan iklan media sosial untuk menjangkau pelanggan ideal Anda pada waktu yang tepat, dengan pesan yang tepat, memastikan setiap dolar dari pengeluaran iklan Anda dioptimalkan untuk kinerja.",
    benefits: [
      "Lalu lintas yang cepat dan sangat bertarget",
      "Kontrol penuh atas anggaran dan pengeluaran iklan Anda",
      "Pengujian A/B untuk optimisasi berkelanjutan",
      "Pelacakan dan pelaporan kinerja yang terperinci"
    ],
    icon: Target,
    image: 'vworks-ads',
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    description: 'Libatkan audiens Anda dan bangun kehadiran merek yang kuat di media sosial.',
    longDescription: "Kami membuat dan mengelola kampanye media sosial yang berdampak yang membina komunitas dan mendorong keterlibatan. Dari pembuatan konten hingga interaksi audiens, kami menangani semua aspek media sosial Anda untuk membangun pengikut setia and mengubah pengikut menjadi pelanggan.",
    benefits: [
      "Peningkatan kesadaran dan jangkauan merek",
      "Keterlibatan langsung dengan audiens target Anda",
      "Peningkatan lalu lintas situs web dari platform sosial",
      "Wawasan berharga tentang perilaku pelanggan"
    ],
    icon: Megaphone,
    image: 'vworks-smm',
  },
  {
    slug: 'branding-design',
    title: 'Branding & Design',
    description: 'Bangun identitas merek yang kuat dan berkesan melalui desain visual yang strategis.',
    longDescription: "Identitas visual adalah wajah merek Anda. Tim desainer kami akan membantu Anda menciptakan logo, palet warna, dan materi branding yang tidak hanya menarik secara visual tetapi juga mengkomunikasikan nilai-nilai inti bisnis Anda secara efektif.",
    benefits: [
        "Identitas merek yang profesional dan kohesif",
        "Diferensiasi dari kompetitor",
        "Meningkatkan pengenalan dan loyalitas merek",
        "Materi pemasaran yang konsisten dan menarik"
    ],
    icon: Palette,
    image: 'vworks-branding',
  },
  {
    slug: 'seo-dan-artikel',
    title: 'SEO & Artikel',
    description: 'Tingkatkan peringkat, tarik trafik organik, dan bangun otoritas dengan konten berkualitas.',
    longDescription: "Kami menggabungkan optimisasi mesin pencari (SEO) teknis dengan pembuatan konten artikel yang relevan dan bernilai. Strategi ini dirancang untuk menempatkan Anda di puncak hasil pencarian dan menjadikan merek Anda sebagai sumber informasi terpercaya di industri Anda.",
    benefits: [
      "Peningkatan visibilitas pencarian organik",
      "Peningkatan kredibilitas dan kepercayaan merek",
      "Mendatangkan prospek berkualitas melalui konten yang bermanfaat",
      "Hasil yang terukur dan pertumbuhan jangka panjang"
    ],
    icon: LineChart,
    image: 'vworks-seo',
  },
  {
    slug: 'content-creator',
    title: 'Content Creator',
    description: 'Produksi konten video kreatif untuk platform seperti TikTok dan Instagram Reels.',
    longDescription: "Di era video pendek, konten yang otentik dan menarik adalah kunci. Tim kreator kami siap memproduksi video vertikal yang mengikuti tren, menghibur audiens, dan secara efektif menampilkan produk atau layanan Anda untuk mendorong engagement dan konversi.",
    benefits: [
        "Konten video yang relevan dengan tren saat ini",
        "Peningkatan jangkauan dan interaksi di platform video pendek",
        "Membangun koneksi yang lebih otentik dengan audiens muda",
        "Materi promosi yang segar dan mudah dibagikan"
    ],
    icon: Video,
    image: 'vworks-content-creator',
  },
  {
    slug: 'keuangan-pajak',
    title: 'Keuangan & Pajak',
    description: 'Layanan akuntansi dan pelaporan pajak profesional untuk kesehatan finansial bisnis Anda.',
    longDescription: "Jaga agar keuangan bisnis Anda tetap teratur dan patuh pada peraturan. Kami menyediakan layanan akuntansi yang akurat dan pengelolaan perpajakan yang efisien, sehingga Anda dapat fokus pada pengembangan bisnis inti Anda.",
    benefits: [
        "Laporan keuangan yang akurat dan tepat waktu",
        "Kepatuhan terhadap peraturan perpajakan",
        "Efisiensi dalam pengelolaan keuangan",
        "Membantu pengambilan keputusan bisnis yang lebih baik"
    ],
    icon: Landmark,
    image: 'vworks-finance',
  },
  {
    slug: 'foto-produk-umkm',
    title: 'Foto Produk UMKM',
    description: 'Layanan foto produk dengan set background menarik untuk katalog usaha Anda.',
    longDescription: "Tampilkan produk UMKM Anda dengan kualitas profesional. Kami menyediakan layanan fotografi produk dengan penataan dan latar belakang yang menarik, dirancang khusus untuk meningkatkan daya tarik visual dan mengubah pengunjung menjadi pembeli. Cocok untuk katalog, media sosial, and platform e-commerce.",
    benefits: [
      "Foto produk berkualitas tinggi dengan resolusi tajam",
      "Penataan produk yang kreatif dan sesuai dengan identitas brand",
      "Latar belakang yang bersih dan menarik",
      "Meningkatkan kepercayaan pelanggan dan citra profesional"
    ],
    icon: Camera,
    image: 'vworks-product-photo',
  },
];

export type PricingPackage = {
  name: string;
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  includes: string;
  excludes: string;
  terms: string;
};

type PricingCategory = {
  category: string;
  icon: LucideIcon;
  packages: PricingPackage[];
};

const VWORKS_PHOTOGRAPHY_TERMS = `1. CAKUPAN LAYANAN (INCLUSIONS)
• Penyerahan File: Klien akan menerima hasil akhir dalam format digital (High Resolution) yang dikirimkan melalui tautan Google Drive.
• Properti Studio: Biaya sudah termasuk penggunaan properti dasar yang tersedia di studio VWorks sesuai dengan paket yang dipilih.
• Penyimpanan Data: VWorks akan menjamin penyimpanan cadangan file klien selama 30 hari sejak tanggal pengiriman.
• Konsultasi: Gratis konsultasi konsep dasar agar hasil foto sesuai dengan branding produk klien.

2. BIAYA DI LUAR PAKET (EXCLUSIONS)
• Logistik: Seluruh biaya pengiriman produk ke studio VWorks dan biaya pengiriman kembali ke alamat klien sepenuhnya ditanggung oleh klien.
• Properti Khusus: Biaya paket tidak mencakup properti khusus yang bersifat sekali pakai atau spesifik (seperti bunga segar, bahan makanan tertentu, atau dekorasi khusus permintaan klien).
• Eksternal Talent: Untuk paket Platinum, model disediakan oleh tim VWorks. Jika klien meminta model profesional eksternal/influencer tertentu, maka biaya tambahan akan dikenakan sesuai tarif talent tersebut.
• Lokasi: Biaya hanya berlaku untuk pemotretan di dalam studio VWorks. Pemotretan outdoor atau di lokasi klien akan dikenakan biaya transportasi dan akomodasi tambahan.

3. SISTEM PEMBAYARAN
• Down Payment (DP): Klien wajib membayar DP sebesar 50% dari total tagihan sebagai tanda jadi (booking jadwal).
• Pelunasan: Pelunasan dilakukan setelah proses editing selesai. File akhir tanpa watermark hanya akan dikirimkan setelah pembayaran lunas 100%.

4. PROSEDUR PRODUK & PENGERJAAN
• Kedatangan Produk: Produk harus sudah diterima oleh tim VWorks minimal 2 hari sebelum jadwal pemotretan.
• Durasi Kerja: Proses pengerjaan (pemotretan hingga editing) memakan waktu 3-7 hari kerja, tergantung pada jumlah produk dan antrean.
• Pengambilan Produk: Produk yang tidak diambil dalam waktu 30 hari setelah proyek selesai bukan lagi menjadi tanggung jawab VWorks.

5. REVISI DAN PEMOTRETAN ULANG
• Batas Revisi: Klien berhak mendapatkan 1x revisi editing (warna/kecerahan) tanpa biaya tambahan.
• Re-shoot: Permintaan foto ulang (re-shoot) karena perubahan konsep dari pihak klien akan dikenakan biaya penuh sesuai harga paket. Foto ulang tanpa biaya hanya dilakukan jika terjadi kesalahan teknis murni dari pihak VWorks.`;


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
                excludes: 'Perpanjangan tahun ke-2, Maintenance konten rutin',
                terms: 'Harga termasuk PPN 11%. Pembayaran 50% di awal dan 50% setelah proyek selesai. Revisi minor maksimal 3 kali. Proyek selesai dalam 14 hari kerja.'
            },
            {
                name: 'Vworks Corp Web',
                title: 'Website Corporation',
                price: 'Rp 2.500.000',
                description: 'Profil perusahaan lengkap & desain responsif',
                includes: 'Integrasi Sosmed, SEO Basic, Email Bisnis',
                excludes: 'Pembuatan aset foto/video produk',
                terms: 'Harga termasuk PPN 11%. Pembayaran 50% di awal dan 50% setelah proyek selesai. Revisi desain maksimal 2 kali. Waktu pengerjaan 30 hari kerja. Konten disediakan oleh klien.'
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
                excludes: 'Saldo Iklan (Ad Spend), Materi konten (Creative)',
                terms: 'Biaya jasa belum termasuk saldo iklan (ad spend). Klien bertanggung jawab untuk mengisi saldo iklan. Kontrak minimum 1 bulan. Laporan performa dikirim setiap minggu.'
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
                excludes: 'Balas komentar/DM, Saldo Ads',
                terms: 'Konten diposting sesuai jadwal yang disepakati. Tidak termasuk layanan admin (membalas komentar/DM). Materi dasar (logo, foto produk) disediakan oleh klien. Kontrak minimum 3 bulan.'
            },
            {
                name: 'Vworks Social Pro',
                title: 'Paket Premium (40 Content)',
                price: 'Rp 1.000.000',
                description: '40 Feed Instagram/FB per bulan',
                includes: 'Desain Konten, Admin Posting, Copywriting',
                excludes: 'Photoshoot produk (jika di luar kota)',
                terms: 'Termasuk layanan admin posting. Interaksi dasar (balas komentar/DM) dilakukan pada jam kerja. Sesi foto produk di luar kota akan dikenakan biaya tambahan. Kontrak minimum 3 bulan.'
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
                excludes: 'Cetak fisik (Percetakan)',
                terms: 'Paket termasuk 3 opsi konsep logo awal. Revisi maksimal 3 kali untuk konsep terpilih. File final akan diserahkan setelah pelunasan. Tidak termasuk biaya cetak.'
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
                originalPrice: 'Rp 850.000',
                description: 'Paket optimasi SEO dasar untuk meningkatkan visibilitas awal.',
                includes: 'Riset Keyword, Artikel 500+ kata, Posting',
                excludes: 'Backlink berbayar (PBN), Perbaikan teknis web',
                terms: 'Garansi tidak termasuk peringkat #1, namun kami menargetkan peningkatan visibilitas dan trafik. Konten artikel 500-700 kata. Kontrak minimum 6 bulan untuk melihat hasil optimal.'
            },
            {
                name: 'Vworks SEO Pro',
                title: 'SEO Optimization Premium (60 Art)',
                price: 'Rp 1.300.000',
                originalPrice: 'Rp 1.700.000',
                description: 'Paket optimasi SEO komprehensif untuk hasil maksimal.',
                includes: 'Riset Keyword, Optimasi On-Page, Laporan bulanan',
                excludes: 'Maintenance server website',
                terms: 'Sama seperti paket starter with jumlah konten lebih banyak. Termasuk optimasi teknis dasar on-page. Kontrak minimum 6 bulan. Laporan peringkat kata kunci dikirim bulanan.'
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
                excludes: 'Biaya kirim & balik produk',
                terms: 'Klien mengirimkan produk ke alamat kami, ongkos kirim ditanggung klien. Produk akan dikembalikan setelah selesai (ongkir ditanggung klien). Revisi video minor 1 kali. Konten menjadi hak milik klien.'
            },
            {
                name: 'Vworks Tiktok Branding',
                title: 'Video Hiburan/Branding',
                price: 'Rp 50.000 /konten',
                description: 'Fokus pada engagement dan kreativitas',
                includes: 'Konsep Kreatif, Editing, Audio Tren',
                excludes: 'Biaya kirim & balik produk, Talent eksternal',
                terms: 'Konsep kreatif akan didiskusikan bersama klien. Tidak ada jaminan viral. Revisi video minor 1 kali. Klien menyediakan produk atau aset brand yang diperlukan.'
            }
        ]
    },
    {
        category: 'Keuangan & Pajak',
        icon: Landmark,
        packages: [
            {
                name: 'Vworks Finpro',
                title: 'Akuntansi dan Perpajakan',
                price: 'Rp 2.000.000/bulan',
                description: 'Layanan Pengelolaan transaksi keuangan dan pelaporan pajak',
                includes: 'Laporan laba rugi dan Neraca',
                excludes: '',
                terms: 'Klien wajib memberikan akses ke data transaksi secara berkala. Layanan tidak termasuk konsultasi pajak mendalam atau pengurusan sengketa pajak. Laporan dikirimkan paling lambat tanggal 15 setiap bulannya.'
            },
            {
                name: 'Vworks Finpro Lite',
                title: 'Akuntansi',
                price: 'Rp 1.000.000/bulan',
                description: 'Layanan Pengelolaan transaksi keuangan',
                includes: '',
                excludes: '',
                terms: 'Layanan terbatas pada pencatatan dan pembukuan transaksi. Tidak termasuk pelaporan pajak. Klien menyediakan semua bukti transaksi (nota, faktur, dll).'
            }
        ]
    },
    {
        category: 'Foto Produk UMKM',
        icon: Camera,
        packages: [
            {
                name: 'Vworks Foto Basic',
                title: 'Paket Basic (Clean & Simple)',
                price: 'Rp100.000 / produk',
                description: 'Cocok untuk katalog e-commerce (Shopee/Tokopedia).',
                includes: '5 Foto, Background polos, Pencahayaan studio, File resolusi tinggi',
                excludes: '',
                terms: VWORKS_PHOTOGRAPHY_TERMS,
            },
            {
                name: 'Vworks Foto Premium',
                title: 'Paket Premium (Creative Styling)',
                price: 'Rp200.000 / produk',
                description: 'Cocok untuk konten media sosial atau branding.',
                includes: '5 Foto, Background dengan properti, Jasa Editing (Color grading & retouching), Pencahayaan kreatif',
                excludes: '',
                terms: VWORKS_PHOTOGRAPHY_TERMS,
            },
            {
                name: 'Vworks Foto Platinum',
                title: 'Paket Platinum (Professional Concept)',
                price: 'Rp300.000 / produk',
                description: 'Solusi lengkap untuk branding premium dengan model.',
                includes: '5 Foto, Background estetik atau Model, Jasa Editing (Advanced retouching), Art Direction',
                excludes: '',
                terms: VWORKS_PHOTOGRAPHY_TERMS,
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
  { slug: 'keuangan', name: 'Keuangan & Pajak', icon: Landmark },
  { slug: 'foto-produk-umkm', name: 'Foto Produk UMKM', icon: Camera },
];


export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: 'venturego-website',
    title: 'VentureGo Website',
    category: 'Web Development',
    description: '',
    image: 'https://i.imgur.com/Lxmvlk3.png',
    imageHint: 'website screenshot',
    link: 'https://venturego.id',
  },
  {
    slug: 'visitwonosobo-website',
    title: 'Visit Wonosobo Website',
    category: 'Web Development',
    description: '',
    image: 'https://i.imgur.com/hus31ll.png',
    imageHint: 'website screenshot',
    link: 'https://visitwonosobo.tour-travel.id',
  },
  {
    slug: 'vworks-website',
    title: 'VWORKS.ID Website',
    category: 'Web Development',
    description: '',
    image: 'https://i.imgur.com/EQCrbnu.png',
    imageHint: 'website screenshot',
    link: 'https://vworks.id',
  },
  {
    slug: 'jhonsbarber-website',
    title: 'Jhons Barber Academy Website',
    category: 'Web Development',
    description: '',
    image: 'https://i.imgur.com/XfU0hP5.png',
    imageHint: 'website screenshot',
    link: 'https://jhonsbarberacademy.com',
  },
  {
    slug: 'venturego-smm',
    title: 'VentureGo Instagram',
    category: 'Social Media Management',
    description: '',
    image: 'https://i.imgur.com/GiYSLPi.png',
    imageHint: 'instagram profile',
    link: 'https://www.instagram.com/venturego.id/',
  },
  {
    slug: 'vworks-smm',
    title: 'VWORKS.ID Instagram',
    category: 'Social Media Management',
    description: '',
    image: 'https://i.imgur.com/wB6jhgg.png',
    imageHint: 'instagram profile',
    link: 'https://www.instagram.com/vworks.id/',
  },
  {
    slug: 'integratedfarming-smm',
    title: 'Integrated Farming Instagram',
    category: 'Social Media Management',
    description: '',
    image: 'https://i.imgur.com/gEsuvkI.png',
    imageHint: 'instagram profile',
    link: 'https://www.instagram.com/integratedfarming.id/',
  },
  {
    slug: 'basmallah-kafe-smm',
    title: 'Basmallah Kafe Instagram',
    category: 'Social Media Management',
    description: '',
    image: 'https://i.imgur.com/xD7sZ7M.png',
    imageHint: 'social media design',
    link: 'https://www.instagram.com/basmallah_kafe/',
  },
  {
    slug: 'easylauk-smm',
    title: 'Easy Lauk Instagram',
    category: 'Social Media Management',
    description: '',
    image: 'https://i.imgur.com/PECQVZv.png',
    imageHint: 'social media design',
    link: 'https://www.instagram.com/easylauk.id/',
  },
  {
    slug: 'tourism-watch-smm',
    title: 'Tourism Watch Instagram',
    category: 'Social Media Management',
    description: '',
    image: 'https://i.imgur.com/YDhSWxa.png',
    imageHint: 'social media design',
    link: 'https://www.instagram.com/id.tourismwatch/',
  },
  {
    slug: 'berkahjaya-tiktok',
    title: 'Berkah Jaya TikTok',
    category: 'Content Marketing',
    description: '',
    image: 'https://i.imgur.com/YPiGw17.png',
    imageHint: 'tiktok profile',
    link: 'https://www.tiktok.com/@berkahjaya.official',
  },
  {
    slug: 'vworks-tiktok',
    title: 'VWORKS.ID TikTok',
    category: 'Content Marketing',
    description: '',
    image: 'https://i.imgur.com/hgjUEl3.png',
    imageHint: 'tiktok profile',
    link: 'https://www.tiktok.com/@vworks.id',
  },
  {
    slug: 'jhonsbarber-seo',
    title: 'Jhons Barber Academy Blog',
    category: 'SEO',
    description: '',
    image: 'https://i.imgur.com/QvWNDZr.png',
    imageHint: 'blog page',
    link: 'https://jhonsbarberacademy.com/blogs-redesign/',
  },
  {
    slug: 'vworks-seo',
    title: 'VWORKS.ID Blog',
    category: 'SEO',
    description: '',
    image: 'https://i.imgur.com/P5HQzkA.png',
    imageHint: 'blog page',
    link: 'https://vworks.id/artikel',
  },
  {
    slug: 'visitwonosobo-seo',
    title: 'Visit Wonosobo See and Do',
    category: 'SEO',
    description: '',
    image: 'https://i.imgur.com/5W6ix7V.png',
    imageHint: 'blog page',
    link: 'https://visitwonosobo.tour-travel.id/see-and-do',
  },
  {
    slug: 'foto-produk-1',
    title: 'Foto Produk UMKM 1',
    category: 'Foto Produk UMKM',
    description: '',
    image: 'https://i.imgur.com/zSs4Mue.png',
    imageHint: 'product photography',
    link: 'https://www.instagram.com/basmallah_kafe/',
  },
  {
    slug: 'foto-produk-2',
    title: 'Foto Produk UMKM 2',
    category: 'Foto Produk UMKM',
    description: '',
    image: 'https://i.imgur.com/ZyjwBDi.png',
    imageHint: 'product photography',
    link: 'https://www.instagram.com/easylauk.id/',
  },
];


export const ARTICLES: Article[] = [
  {
    slug: 'strategi-seo-2024',
    title: 'Strategi SEO 2024: 5 Tren yang Wajib Anda Ketahui',
    category: 'SEO',
    excerpt: 'Dunia SEO terus berubah. Pelajari tren terbaru di tahun 2024 untuk memastikan website Anda tetap berada di puncak hasil pencarian Google.',
    content: '<h3>Pendahuluan</h3><p>Optimisasi Mesin Pencari (SEO) adalah komponen vital dalam strategi digital. Di tahun 2024, lanskap SEO berkembang dengan cepat, didorong oleh kecerdasan buatan (AI) dan perubahan perilaku pengguna. Memahami tren ini adalah kunci untuk tetap kompetitif.</p><h3>1. AI dan Pencarian Generatif (SGE)</h3><p>Google Search Generative Experience (SGE) mengubah cara pengguna berinteraksi dengan hasil pencarian. Konten Anda harus dioptimalkan untuk menjawab pertanyaan secara langsung dan komprehensif agar dapat ditampilkan dalam jawaban generatif AI. Fokus pada pembuatan konten yang berwibawa dan berbasis data.</p><h3>2. Pentingnya E-E-A-T</h3><p>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) menjadi lebih penting dari sebelumnya. Pastikan konten Anda ditulis oleh para ahli di bidangnya, tunjukkan pengalaman nyata, dan bangun kepercayaan melalui ulasan positif dan backlink berkualitas.</p><h3>3. Optimasi Pencarian Suara (Voice Search)</h3><p>Dengan meningkatnya penggunaan asisten virtual, optimasi untuk pencarian suara menjadi krusial. Gunakan bahasa yang lebih natural dan conversational dalam konten Anda, serta fokus pada long-tail keywords yang mencerminkan cara orang berbicara.</p><h3>4. Video SEO</h3><p>Konten video terus mendominasi. Optimalkan judul, deskripsi, dan tag video Anda di platform seperti YouTube dan TikTok. Buat transkrip video untuk membantu mesin pencari memahami konten Anda dan meningkatkan aksesibilitas.</p><h3>5. Core Web Vitals dan Pengalaman Pengguna</h3><p>Kecepatan loading, interaktivitas, dan stabilitas visual (Core Web Vitals) tetap menjadi faktor peringkat utama. Pastikan website Anda responsif, cepat, dan mudah dinavigasi di semua perangkat untuk memberikan pengalaman pengguna yang mulus.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel1/800/450',
    imageHint: 'seo strategy analytics',
    author: 'Tim VWORKS.ID',
    date: '28 Juli 2024',
  },
  {
    slug: 'membangun-brand-kuat-sosmed',
    title: 'Cara Membangun Brand yang Kuat di Media Sosial',
    category: 'Social Media Management',
    excerpt: 'Media sosial adalah alat yang ampuh untuk membangun brand. Temukan langkah-langkah praktis untuk meningkatkan kehadiran and engagement brand Anda.',
    content: '<p>Membangun brand yang kuat di media sosial memerlukan konsistensi, kreativitas, and strategi. Tentukan suara brand Anda, kenali audiens Anda, dan buat kalender konten yang terencana. Manfaatkan fitur-fitur seperti Stories, Reels, dan Live untuk berinteraksi secara langsung dengan pengikut. Jangan lupa untuk menganalisis metrik performa secara rutin untuk menyempurnakan strategi Anda.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel2/800/450',
    imageHint: 'social media branding',
    author: 'Andi Pratama',
    date: '27 Juli 2024',
  },
  {
    slug: 'landing-page-konversi-tinggi',
    title: '7 Elemen Wajib untuk Landing Page dengan Konversi Tinggi',
    category: 'Web Development',
    excerpt: 'Landing page adalah gerbang utama konversi. Pastikan halaman Anda memiliki semua elemen penting ini untuk mengubah pengunjung menjadi pelanggan.',
    content: '<p>Landing page yang efektif harus memiliki judul yang menarik, penawaran yang jelas, visual yang relevan, bukti sosial (seperti testimoni), formulir yang ringkas, dan Call-to-Action (CTA) yang kuat. Hilangkan semua navigasi yang tidak perlu untuk menjaga fokus pengunjung pada satu tujuan: konversi.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel3/800/450',
    imageHint: 'web design conversion',
    author: 'Siti Rahayu',
    date: '26 Juli 2024',
  },
  {
    slug: 'google-ads-untuk-pemula',
    title: 'Panduan Lengkap Google Ads untuk Pemula',
    category: 'Ads Service',
    excerpt: 'Baru memulai dengan Google Ads? Panduan ini akan memandu Anda melalui dasar-dasar, dari penargetan kata kunci hingga pengoptimalan anggaran.',
    content: '<p>Google Ads bisa terasa rumit pada awalnya. Mulailah dengan memahami struktur kampanye: Kampanye > Grup Iklan > Iklan & Kata Kunci. Lakukan riset kata kunci yang mendalam, tulis teks iklan yang menarik, dan atur anggaran harian yang realistis. Pantau terus Kinerja Iklan (CTR, Conversion Rate) dan lakukan A/B testing untuk hasil maksimal.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel4/800/450',
    imageHint: 'google ads dashboard',
    author: 'Budi Santoso',
    date: '25 Juli 2024',
  },
  {
    slug: 'psikologi-warna-dalam-branding',
    title: 'Psikologi Warna dalam Branding: Lebih dari Sekadar Estetika',
    category: 'Branding & Design',
    excerpt: 'Warna memiliki dampak psikologis yang kuat pada persepsi brand. Pelajari cara memilih palet warna yang tepat untuk bisnis Anda.',
    content: '<p>Setiap warna membangkitkan emosi dan asosiasi yang berbeda. Merah sering dikaitkan dengan energi dan gairah, biru dengan kepercayaan dan profesionalisme, sementara hijau melambangkan pertumbuhan dan kesehatan. Memahami psikologi warna akan membantu Anda membangun identitas brand yang lebih dalam dan beresonansi dengan target pasar Anda.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel5/800/450',
    imageHint: 'color palette design',
    author: 'Rina Wijaya',
    date: '24 Juli 2024',
  },
  {
    slug: 'content-marketing-b2b',
    title: 'Content Marketing untuk B2B: Bagaimana Caranya?',
    category: 'Content Marketing',
    excerpt: 'Menjual ke bisnis lain membutuhkan pendekatan konten yang berbeda. Inilah cara membuat strategi content marketing B2B yang berhasil.',
    content: '<p>Content marketing B2B berfokus pada pembangunan kepercayaan dan otoritas. Buat studi kasus, white paper, webinar, and artikel blog yang mendalam untuk menunjukkan keahlian Anda. Peta perjalanan pembeli (buyer\'s journey) untuk menyediakan konten yang relevan di setiap tahap, dari kesadaran hingga pengambilan keputusan.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel6/800/450',
    imageHint: 'b2b marketing meeting',
    author: 'Tim VWORKS.ID',
    date: '23 Juli 2024',
  },
  {
    slug: 'mengukur-roi-digital-marketing',
    title: 'Cara Akurat Mengukur ROI dari Digital Marketing',
    category: 'Keuangan & Pajak',
    excerpt: 'Investasi digital marketing harus terukur. Pelajari metrik dan formula kunci untuk menghitung Return on Investment (ROI) kampanye Anda.',
    content: '<p>Untuk mengukur ROI, Anda perlu melacak biaya kampanye dan pendapatan yang dihasilkannya. Gunakan Google Analytics dan platform iklan untuk melacak konversi. Formula dasarnya adalah: ((Pendapatan - Biaya) / Biaya) x 100%. Metrik penting lainnya termasuk Customer Acquisition Cost (CAC) dan Customer Lifetime Value (CLV).</p>',
    imageUrl: 'https://picsum.photos/seed/artikel7/800/450',
    imageHint: 'financial chart report',
    author: 'Dewi Lestari',
    date: '22 Juli 2024',
  },
  {
    slug: 'responsive-design-penting',
    title: 'Mengapa Desain Responsif adalah Kewajiban, Bukan Pilihan',
    category: 'Web Development',
    excerpt: 'Lebih dari separuh traffic web berasal dari perangkat mobile. Jika situs Anda tidak responsif, Anda kehilangan banyak pelanggan potensial.',
    content: '<p>Desain responsif memastikan website Anda tampil sempurna di semua ukuran layar, dari desktop hingga smartphone. Ini tidak hanya meningkatkan pengalaman pengguna tetapi juga merupakan faktor peringkat penting untuk SEO. Google memprioritaskan situs yang mobile-friendly dalam hasil pencariannya.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel8/800/450',
    imageHint: 'responsive web design',
    author: 'Siti Rahayu',
    date: '21 Juli 2024',
  },
  {
    slug: 'tiktok-marketing-untuk-bisnis',
    title: 'Pemanfaatan TikTok Marketing untuk Pertumbuhan Bisnis',
    category: 'Social Media Management',
    excerpt: 'TikTok bukan lagi hanya untuk menari. Pelajari cara memanfaatkan platform ini untuk menjangkau audiens baru dan meningkatkan penjualan.',
    content: '<p>Kunci sukses di TikTok adalah keaslian dan kreativitas. Buat konten yang menghibur dan informatif, ikuti tren yang relevan, dan gunakan hashtag yang tepat. TikTok Ads juga menawarkan opsi penargetan yang kuat untuk kampanye berbayar. Berkolaborasi dengan influencer TikTok dapat mempercepat pertumbuhan brand Anda.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel9/800/450',
    imageHint: 'tiktok interface phone',
    author: 'Andi Pratama',
    date: '20 Juli 2024',
  },
  {
    slug: 'local-seo-untuk-umkm',
    title: 'Panduan Local SEO: Mendominasi Pencarian di Area Anda',
    category: 'SEO',
    excerpt: 'Bagi UMKM, memenangkan persaingan di tingkat lokal adalah kunci. Optimalkan kehadiran online Anda untuk menarik pelanggan terdekat.',
    content: '<p>Local SEO berfokus pada optimasi untuk pencarian "near me". Klaim dan optimalkan profil Google Business Profile Anda dengan informasi yang akurat. Dapatkan ulasan positif dari pelanggan, dan pastikan Nama, Alamat, dan Nomor Telepon (NAP) Anda konsisten di seluruh web. Buat konten yang menargetkan kata kunci lokal.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel10/800/450',
    imageHint: 'local business map',
    author: 'Tim VWORKS.ID',
    date: '19 Juli 2024',
  },
  {
    slug: 'rebranding-tanpa-kehilangan-pelanggan',
    title: 'Rebranding: Cara Tepat Tanpa Kehilangan Pelanggan Setia',
    category: 'Branding & Design',
    excerpt: 'Rebranding adalah langkah besar. Lakukan dengan strategi yang matang agar transisi berjalan mulus dan diterima baik oleh pasar.',
    content: '<p>Sebelum rebranding, pahami alasan utamanya. Komunikasikan perubahan kepada pelanggan Anda secara transparan. Luncurkan identitas baru secara konsisten di semua platform. Rebranding yang sukses bukan hanya tentang logo baru, tetapi tentang evolusi cerita dan janji brand Anda.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel11/800/450',
    imageHint: 'branding mood board',
    author: 'Rina Wijaya',
    date: '18 Juli 2024',
  },
  {
    slug: 'facebook-ads-retargeting',
    title: 'Kekuatan Retargeting di Facebook Ads',
    category: 'Ads Service',
    excerpt: 'Jangan biarkan pengunjung situs yang pergi begitu saja. Gunakan strategi retargeting Facebook Ads untuk membawa mereka kembali dan melakukan konversi.',
    content: '<p>Dengan Facebook Pixel, Anda dapat menargetkan ulang iklan kepada orang-orang yang telah mengunjungi situs web Anda. Buat audiens kustom berdasarkan perilaku mereka (misalnya, mengunjungi halaman produk tertentu atau meninggalkan keranjang belanja). Tawarkan diskon atau pengingat untuk mendorong mereka menyelesaikan pembelian.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel12/800/450',
    imageHint: 'facebook ads flowchart',
    author: 'Budi Santoso',
    date: '17 Juli 2024',
  },
  {
    slug: 'membuat-blog-yang-menghasilkan',
    title: 'Dari Nol Hingga Profit: Cara Membuat Blog yang Menghasilkan',
    category: 'Content Marketing',
    excerpt: 'Blog bukan hanya buku harian online. Ini bisa menjadi aset pemasaran yang kuat dan bahkan sumber pendapatan. Begini cara memulainya.',
    content: '<p>Pilih niche yang Anda kuasai dan minati. Lakukan riset kata kunci untuk menemukan topik yang dicari orang. Tulis konten berkualitas tinggi secara konsisten. Promosikan artikel Anda di media sosial dan melalui email. Setelah memiliki traffic, monetisasi blog Anda melalui iklan, pemasaran afiliasi, atau menjual produk Anda sendiri.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel13/800/450',
    imageHint: 'writing on laptop',
    author: 'Tim VWORKS.ID',
    date: '16 Juli 2024',
  },
  {
    slug: 'cash-flow-untuk-startup',
    title: 'Manajemen Arus Kas (Cash Flow) untuk Startup',
    category: 'Keuangan & Pajak',
    excerpt: 'Arus kas adalah napas bagi startup. Pelajari dasar-dasar manajemen cash flow agar bisnis Anda tetap sehat dan berkelanjutan.',
    content: '<p>Buat proyeksi arus kas bulanan untuk memprediksi pemasukan dan pengeluaran. Pisahkan rekening bank pribadi dan bisnis. Kelola piutang dengan menagih tepat waktu, dan negosiasikan syarat pembayaran yang lebih lama dengan pemasok. Selalu siapkan dana darurat untuk biaya tak terduga.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel14/800/450',
    imageHint: 'cash flow document',
    author: 'Dewi Lestari',
    date: '15 Juli 2024',
  },
  {
    slug: 'kecepatan-website-core-web-vitals',
    title: 'Optimasi Kecepatan Website Sesuai Core Web Vitals',
    category: 'Web Development',
    excerpt: 'Website lambat membunuh konversi. Pelajari cara mengoptimalkan situs Anda sesuai metrik Core Web Vitals dari Google.',
    content: '<p>Tiga pilar Core Web Vitals adalah Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Optimalkan gambar Anda, manfaatkan caching browser, kurangi file JavaScript yang tidak perlu, dan gunakan Content Delivery Network (CDN) untuk meningkatkan kecepatan loading situs Anda secara dramatis.</p>',
    imageUrl: 'https://picsum.photos/seed/artikel15/800/450',
    imageHint: 'website speed test',
    author: 'Siti Rahayu',
    date: '14 Juli 2024',
  },
];