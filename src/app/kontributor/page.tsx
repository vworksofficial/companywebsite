'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth, useFirestore, useUser, useCollection } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, PenLine, Send, UserPlus, LogIn, AlertCircle, FileText, List, PlusCircle, CheckCircle2, XCircle, Eye, Settings, BarChart3, ExternalLink, Pencil, Sparkles, Trash2, Search } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ARTICLES as STATIC_ARTICLES } from '@/lib/constants';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const CATEGORIES = [
  'Web Development',
  'Social Media Management',
  'Branding & Design',
  'SEO',
  'Content Marketing',
  'Ads Service',
  'Keuangan & Pajak',
];

type View = 'tulisanmu' | 'buat-artikel' | 'semua-artikel';

export default function ContributorPage() {
  const auth = useAuth();
  const { firestore } = useFirestore();
  const { user, loading: authLoading } = useUser();
  const { toast } = useToast();

  const [isMounted, setIsMounted] = useState(false);
  const [activeView, setActiveView] = useState<View>('buat-artikel');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [tableCategoryFilter, setTableCategoryFilter] = useState<string>('all');
  const [tableAuthorFilter, setTableAuthorFilter] = useState<string>('');
  const [tableTitleFilter, setTableTitleFilter] = useState<string>('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setTableCategoryFilter('all');
    setTableAuthorFilter('');
    setTableTitleFilter('');
  }, [activeView]);

  const slug = useMemo(() => {
    return title.toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }, [title]);

  const seoAnalysis = useMemo(() => {
    const kw = focusKeyword.toLowerCase();
    const t = title.toLowerCase();
    const s = slug.toLowerCase();
    const e = excerpt.toLowerCase();
    const c = content.toLowerCase();
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    
    const kwCount = kw ? (c.match(new RegExp(kw, 'gi')) || []).length : 0;
    const density = words > 0 ? (kwCount / words) * 100 : 0;
    const firstParagraph = c.split(/<br>|\n/)[0] || '';
    const sourcesKeywords = ['sumber', 'referensi', 'daftar pustaka', 'bibliography', 'sources'];
    const hasSources = sourcesKeywords.some(keyword => c.includes(keyword));
    const hasInternalLinks = c.includes('href="/') || c.includes('vworks.id');
    const hasExternalLinks = c.includes('href="http') && !c.includes('vworks.id');

    const analysis = {
      keywordInTitle: !!(kw && t.includes(kw)),
      keywordInSlug: !!(kw && s.includes(kw)),
      keywordInFirstParagraph: !!(kw && firstParagraph.includes(kw)),
      keywordInMeta: !!(kw && e.includes(kw)),
      keywordInBody: !!(kw && c.includes(kw)),
      keywordDensity: kwCount >= 3,
      wordCount: words >= 1150,
      titleLength: t.length >= 50 && t.length <= 60,
      metaLength: e.length >= 145 && e.length <= 155,
      hasImage: !!imageUrl,
      hasSubheadings: c.includes('h2') || c.includes('h3') || c.includes('<b>') || c.includes('<strong>'),
      hasSources,
      hasInternalLinks,
      hasExternalLinks,
      totalWords: words,
      keywordDensityValue: density.toFixed(2)
    };

    const criteria = [
      analysis.keywordInTitle, analysis.keywordInSlug, analysis.keywordInFirstParagraph,
      analysis.keywordInMeta, analysis.keywordInBody, analysis.keywordDensity,
      analysis.wordCount, analysis.titleLength, analysis.metaLength,
      analysis.hasImage, analysis.hasSubheadings, analysis.hasSources,
      analysis.hasInternalLinks, analysis.hasExternalLinks
    ];
    const score = Math.round((criteria.filter(Boolean).length / criteria.length) * 100);

    return { ...analysis, score };
  }, [title, slug, excerpt, content, focusKeyword, imageUrl]);

  const userArticlesQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'articles'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user]);

  const { data: myArticles, loading: articlesLoading } = useCollection(userArticlesQuery);

  const allArticlesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'articles'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore]);

  const { data: dynamicArticles, loading: dynamicArticlesLoading } = useCollection(allArticlesQuery);

  const combinedAllArticles = useMemo(() => {
    const dynamic = (dynamicArticles || []).map(art => ({ ...art, isDynamic: true, id: art.id }));
    const staticArts = STATIC_ARTICLES.map(art => ({ ...art, isDynamic: false, id: art.slug }));
    return [...dynamic, ...staticArts];
  }, [dynamicArticles]);

  const filteredCombinedArticles = useMemo(() => {
    return combinedAllArticles.filter((art: any) => {
      const matchesCategory = tableCategoryFilter === 'all' || art.category === tableCategoryFilter;
      const matchesAuthor = !tableAuthorFilter || art.author?.toLowerCase().includes(tableAuthorFilter.toLowerCase());
      const matchesTitle = !tableTitleFilter || art.title?.toLowerCase().includes(tableTitleFilter.toLowerCase());
      return matchesCategory && matchesAuthor && matchesTitle;
    });
  }, [combinedAllArticles, tableCategoryFilter, tableAuthorFilter, tableTitleFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Login Berhasil', description: 'Selamat datang kembali!' });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { 
          displayName: displayName
        });
      }
      toast({ title: 'Pendaftaran Berhasil', description: 'Akun kontributor Anda telah dibuat.' });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    toast({ title: 'Logout Berhasil', description: 'Sampai jumpa kembali!' });
  };

  const handleEdit = (art: any) => {
    setEditingId(art.id);
    setTitle(art.title);
    setCategory(art.category);
    setExcerpt(art.excerpt || '');
    setContent(art.content.replace(/<br>/g, '\n'));
    setImageUrl(art.imageUrl);
    setFocusKeyword('');
    setActiveView('buat-artikel');
    toast({ title: "Mode Edit Aktif", description: `Menyunting: ${art.title}` });
  };

  const handleDelete = (id: string) => {
    if (!firestore) return;
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    const docRef = doc(firestore, 'articles', id);
    deleteDoc(docRef).catch(async (error) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'delete' }));
    });
    toast({ title: 'Artikel Dihapus', description: 'Artikel telah dihapus dari database.' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setExcerpt('');
    setContent('');
    setImageUrl('');
    setFocusKeyword('');
  };

  const handleSubmitArticle = () => {
    if (!firestore || !user) return;
    if (!title || !category || !content) {
      toast({ variant: 'destructive', title: 'Data Tidak Lengkap', description: 'Harap isi semua bidang wajib.' });
      return;
    }

    const articleData = {
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      content: content.replace(/\n/g, '<br>'),
      imageUrl: imageUrl.trim() || 'https://picsum.photos/seed/' + (editingId || slug) + '/800/450',
    };
    
    toast({ title: editingId ? 'Menyimpan Perubahan...' : 'Menerbitkan Artikel...', description: 'Proses sedang berjalan di latar belakang.' });
    setActiveView('tulisanmu');

    if (editingId) {
      const docRef = doc(firestore, 'articles', editingId);
      updateDoc(docRef, { ...articleData, updatedAt: serverTimestamp() }).catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'update', requestResourceData: articleData }));
      });
    } else {
      const newArticle = {
        ...articleData,
        slug: slug + '-' + Math.random().toString(36).substring(2, 7),
        imageHint: 'article cover',
        author: user.displayName || user.email?.split('@')[0] || 'Kontributor',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        createdAt: serverTimestamp(),
        userId: user.uid,
      };
      const colRef = collection(firestore, 'articles');
      addDoc(colRef, newArticle).catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: colRef.path, operation: 'create', requestResourceData: newArticle }));
      });
    }

    resetForm();
  };

  const showDashboard = isMounted && !authLoading && user;

  if (showDashboard) {
    return (
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <aside className="w-64 bg-primary text-primary-foreground flex flex-col flex-shrink-0">
          <div className="p-6 flex flex-col gap-1 border-b border-primary-foreground/10">
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-xl tracking-tight text-white">VWORKS.ID</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50 font-bold px-1 mt-1">Contributor Hub</p>
          </div>
          <nav className="flex-grow p-4 space-y-2">
            <button onClick={() => setActiveView('semua-artikel')} className={cn("w-full flex items-center gap-3 p-3 rounded-lg transition-colors", activeView === 'semua-artikel' ? "bg-white/20" : "hover:bg-primary-foreground/10")}>
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">Semua Artikel</span>
            </button>
            <div className="pt-4 pb-2 px-3">
              <p className="text-[10px] uppercase font-bold text-primary-foreground/40 tracking-wider">Navigasi</p>
            </div>
            <button onClick={() => setActiveView('tulisanmu')} className={cn("w-full flex items-center gap-3 p-3 rounded-lg transition-colors", activeView === 'tulisanmu' ? "bg-white/20" : "hover:bg-primary-foreground/10")}>
              <List className="h-5 w-5" />
              <span className="text-sm font-medium">Tulisanmu</span>
            </button>
            <button onClick={() => { resetForm(); setActiveView('buat-artikel'); }} className={cn("w-full flex items-center gap-3 p-3 rounded-lg transition-colors", activeView === 'buat-artikel' ? "bg-white/20" : "hover:bg-primary-foreground/10")}>
              <PlusCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Buat Artikel</span>
            </button>
          </nav>
          <div className="p-4 border-t border-primary-foreground/10 bg-black/5">
            <div className="mb-4 px-3">
              <p className="text-[10px] uppercase font-bold text-primary-foreground/40 mb-1">Akun Anda</p>
              <p className="text-sm font-semibold truncate text-white">{user.displayName || user.email}</p>
            </div>
            <Button variant="destructive" className="w-full justify-start gap-3 bg-red-600 hover:bg-red-700" onClick={handleLogout}>
              <LogOut className="h-5 w-5" /> <span className="text-sm font-medium">Keluar</span>
            </Button>
          </div>
        </aside>

        <main className="flex-grow overflow-y-auto p-8">
          {activeView === 'buat-artikel' && (
            <div className="max-w-[1200px] mx-auto">
              <div className="mb-8 flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-headline font-bold text-slate-900">{editingId ? 'Edit Artikel' : 'Buat Artikel Baru'}</h1>
                  <p className="text-slate-500">Gunakan sidebar kanan untuk optimasi SEO artikel Anda.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 whitespace-nowrap">SEO Health</span>
                      <span className={cn("text-xs font-bold", seoAnalysis.score >= 80 ? "text-green-600" : seoAnalysis.score >= 50 ? "text-amber-600" : "text-red-600")}>{seoAnalysis.score}%</span>
                    </div>
                    <Progress value={seoAnalysis.score} className="h-1.5" />
                  </div>
                  <div className="flex gap-2">
                    {editingId && <Button variant="outline" size="sm" onClick={resetForm}>Batal Edit</Button>}
                    <Button type="button" onClick={handleSubmitArticle} size="sm" className="shadow-md" disabled={isSubmitting || !title || !content || !category}>
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      {editingId ? 'Simpan Perubahan' : 'Terbitkan Sekarang'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <Card className="shadow-lg border-t-4 border-primary">
                    <CardHeader>
                      <CardTitle className="text-lg">Konten Utama</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="font-bold">Judul Artikel</Label>
                        <Input id="title" placeholder="Masukkan judul..." value={title} onChange={(e) => setTitle(e.target.value)} required className="text-lg font-bold h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="keyword" className="font-bold text-accent-foreground bg-accent/20 px-2 py-0.5 rounded">Focus Keyword SEO</Label>
                        <div className="flex gap-2">
                          <Input id="keyword" placeholder="Kata kunci utama artikel..." value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} className="flex-[7]" />
                          <Button type="button" variant="secondary" className="flex-[3] font-bold" onClick={() => toast({ title: "Fitur AI", description: "Asisten AI sedang dalam tahap pengembangan." })}>
                            <Sparkles className="mr-2 h-4 w-4" /> Generate Artikel
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content" className="font-bold">Isi Konten</Label>
                        <Textarea id="content" placeholder="Tulis di sini... Gunakan <h2> untuk subjudul." value={content} onChange={(e) => setContent(e.target.value)} required className="min-h-[500px] leading-relaxed text-base" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-4 space-y-6 sticky top-8">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-slate-50 py-3 px-4 border-b">
                      <CardTitle className="text-sm">Featured Image</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative aspect-video bg-slate-100 flex items-center justify-center overflow-hidden">
                        {imageUrl ? <Image src={imageUrl} alt="Preview" fill className="object-cover" /> : <div className="text-center p-6 text-slate-400"><PlusCircle className="h-10 w-10 mx-auto mb-2 opacity-20" /><p className="text-xs">Masukkan URL gambar di bawah</p></div>}
                      </div>
                      <div className="p-4 bg-white border-t">
                        <Label htmlFor="imageUrl" className="text-xs font-bold uppercase text-slate-500 mb-1 block">Image URL</Label>
                        <Input id="imageUrl" placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="text-xs h-8" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-slate-50 py-3 px-4 border-b">
                      <CardTitle className="text-sm">Metadata Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label className="text-[10px] uppercase font-bold text-slate-400">URL Slug</Label>
                        <p className="text-xs font-mono bg-slate-100 p-2 rounded mt-1 break-all">/artikel/{slug || 'judul-anda'}</p>
                      </div>
                      <div>
                        <Label className="text-[10px] uppercase font-bold text-slate-400">Kategori</Label>
                        <Select value={category} onValueChange={setCategory} required>
                          <SelectTrigger className="h-9 text-xs mt-1"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                          <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <Label className="text-[10px] uppercase font-bold text-slate-400">Meta Title</Label>
                          <span className={cn("text-[10px] font-bold", seoAnalysis.titleLength ? "text-green-600" : "text-amber-600")}>{title.length} / 60</span>
                        </div>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul SEO..." className="h-9 text-xs" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <Label className="text-[10px] uppercase font-bold text-slate-400">Meta Description</Label>
                          <span className={cn("text-[10px] font-bold", seoAnalysis.metaLength ? "text-green-600" : "text-amber-600")}>{excerpt.length} / 155</span>
                        </div>
                        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Meta Deskripsi..." className="h-20 text-xs min-h-[80px]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-slate-50 py-3 px-4 border-b">
                      <CardTitle className="text-sm">SEO Analysis Checklist</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <SEORequirement label="Keyword in Title" met={seoAnalysis.keywordInTitle} />
                        <SEORequirement label="Keyword in Slug" met={seoAnalysis.keywordInSlug} />
                        <SEORequirement label="Keyword in First Paragraph" met={seoAnalysis.keywordInFirstParagraph} />
                        <SEORequirement label="Keyword in Meta Description" met={seoAnalysis.keywordInMeta} />
                        <SEORequirement label="Keyword in Content Body" met={seoAnalysis.keywordInBody} />
                        <SEORequirement label="Keyword Density (>3 times)" met={seoAnalysis.keywordDensity} />
                        <SEORequirement label="Subheadings (H2/H3) used" met={seoAnalysis.hasSubheadings} />
                        <SEORequirement label="Content Length (>1150 words)" met={seoAnalysis.wordCount} />
                        <SEORequirement label="Meta Title (50-60 chars)" met={seoAnalysis.titleLength} />
                        <SEORequirement label="Meta Desc (145-155 chars)" met={seoAnalysis.metaLength} />
                        <SEORequirement label="Featured Image present" met={seoAnalysis.hasImage} />
                        <SEORequirement label="Sources/Bibliography present" met={seoAnalysis.hasSources} />
                        <SEORequirement label="Internal Links present" met={seoAnalysis.hasInternalLinks} />
                        <SEORequirement label="External Links present" met={seoAnalysis.hasExternalLinks} />
                        <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-2 rounded text-center">
                            <p className="text-[10px] uppercase font-bold text-slate-400">Words</p>
                            <p className="text-lg font-bold text-primary">{seoAnalysis.totalWords}</p>
                          </div>
                          <div className="bg-slate-50 p-2 rounded text-center">
                            <p className="text-[10px] uppercase font-bold text-slate-400">Density</p>
                            <p className="text-lg font-bold text-primary">{seoAnalysis.keywordDensityValue}%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeView === 'semua-artikel' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-headline font-bold text-slate-900">Semua Artikel</h1>
                  <p className="text-slate-500">Daftar seluruh artikel di database.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="w-full md:w-48">
                    <Label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Cari Penulis</Label>
                    <div className="relative">
                      <Input placeholder="Nama penulis..." className="h-9 text-xs px-2" value={tableAuthorFilter} onChange={(e) => setTableAuthorFilter(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              <Card className="shadow-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-bold w-[100px]">Image</TableHead>
                      <TableHead className="font-bold">
                        <div className="flex flex-col gap-1 py-2">
                          <span>Judul Artikel</span>
                          <div className="relative">
                            <Input placeholder="Cari judul..." className="h-7 text-[10px] px-2" value={tableTitleFilter} onChange={(e) => setTableTitleFilter(e.target.value)} />
                          </div>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold">
                        <div className="flex flex-col gap-1 py-2">
                          <span>Kategori</span>
                          <Select value={tableCategoryFilter} onValueChange={setTableCategoryFilter}>
                            <SelectTrigger className="h-7 text-[10px] px-2">
                              <SelectValue placeholder="Semua" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Semua</SelectItem>
                              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dynamicArticlesLoading ? (
                      <TableRow><TableCell colSpan={4} className="h-32 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></TableCell></TableRow>
                    ) : filteredCombinedArticles.length > 0 ? (
                      filteredCombinedArticles.map((art: any) => (
                        <TableRow key={art.id}>
                          <TableCell><div className="relative w-16 h-10 rounded overflow-hidden border"><Image src={art.imageUrl} alt={art.title} fill className="object-cover" /></div></TableCell>
                          <TableCell><div className="flex flex-col"><span className="font-bold text-slate-900 line-clamp-1">{art.title}</span><span className="text-xs text-slate-500">Oleh {art.author} • {art.date}</span></div></TableCell>
                          <TableCell><Badge variant="outline" className="text-[10px] uppercase">{art.category}</Badge></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {art.isDynamic && (
                                <>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary" onClick={() => handleEdit(art)} title="Edit"><Pencil className="h-4 w-4" /></Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" onClick={() => handleDelete(art.id)} title="Hapus"><Trash2 className="h-4 w-4" /></Button>
                                </>
                              )}
                              <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary" title="Buka"><Link href={`/artikel/${art.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : <TableRow><TableCell colSpan={4} className="h-32 text-center text-slate-400">Tidak ada artikel ditemukan.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeView === 'tulisanmu' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-headline font-bold text-slate-900">Tulisanmu</h1>
                  <p className="text-slate-500">Karya yang telah Anda terbitkan.</p>
                </div>
                <Button onClick={() => { resetForm(); setActiveView('buat-artikel'); }}><PlusCircle className="mr-2 h-4 w-4" /> Baru</Button>
              </div>
              
              <Card className="shadow-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-bold w-[100px]">Image</TableHead>
                      <TableHead className="font-bold">
                        <div className="flex flex-col gap-1 py-2">
                          <span>Judul Artikel</span>
                          <div className="relative">
                            <Input placeholder="Cari judul..." className="h-7 text-[10px] px-2" value={tableTitleFilter} onChange={(e) => setTableTitleFilter(e.target.value)} />
                          </div>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold">
                        <div className="flex flex-col gap-1 py-2">
                          <span>Kategori</span>
                          <Select value={tableCategoryFilter} onValueChange={setTableCategoryFilter}>
                            <SelectTrigger className="h-7 text-[10px] px-2">
                              <SelectValue placeholder="Semua" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Semua</SelectItem>
                              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articlesLoading ? (
                      <TableRow><TableCell colSpan={4} className="h-32 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></TableCell></TableRow>
                    ) : myArticles && myArticles.length > 0 ? (
                      myArticles.filter((art: any) => {
                          const matchesTitle = !tableTitleFilter || art.title?.toLowerCase().includes(tableTitleFilter.toLowerCase());
                          const matchesCategory = tableCategoryFilter === 'all' || art.category === tableCategoryFilter;
                          return matchesTitle && matchesCategory;
                      }).map((art: any) => (
                        <TableRow key={art.id}>
                          <TableCell><div className="relative w-16 h-10 rounded overflow-hidden border"><Image src={art.imageUrl} alt={art.title} fill className="object-cover" /></div></TableCell>
                          <TableCell><div className="flex flex-col"><span className="font-bold text-slate-900 line-clamp-1">{art.title}</span><span className="text-xs text-slate-500">{art.date}</span></div></TableCell>
                          <TableCell><Badge variant="outline" className="text-[10px] uppercase">{art.category}</Badge></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary" onClick={() => handleEdit(art)} title="Edit"><Pencil className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" onClick={() => handleDelete(art.id)} title="Hapus"><Trash2 className="h-4 w-4" /></Button>
                              <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-primary" title="Buka"><Link href={`/artikel/${art.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                             <PenLine className="h-10 w-10 text-slate-300" />
                             <p className="text-slate-500">Belum ada tulisan tersimpan.</p>
                             <Button variant="outline" size="sm" onClick={() => { resetForm(); setActiveView('buat-artikel'); }}>Mulai Menulis</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4" suppressHydrationWarning>
      <div className="flex flex-col items-center gap-2 mb-8">
        <Image src="https://imgur.com/lC5Y4YF.png" alt="Vworks Logo" width={60} height={60} />
        <span className="font-headline text-3xl font-bold text-primary tracking-tight">VWORKS.ID</span>
      </div>
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-primary overflow-hidden relative" suppressHydrationWarning>
        {isMounted && authLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <CardHeader className="text-center pb-2 bg-white">
          <CardTitle className="text-2xl font-headline font-bold">{isRegisterMode ? 'Daftar Kontributor' : 'Portal Kontributor'}</CardTitle>
          <CardDescription>{isRegisterMode ? 'Bergabunglah dengan tim penulis kami.' : 'Silakan login untuk mulai mengelola konten.'}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {errorMessage && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
            {isRegisterMode && (
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Nama Anda" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Min. 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full h-11" disabled={isSubmitting || (isMounted && authLoading)} suppressHydrationWarning>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isRegisterMode ? <UserPlus className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
              {isRegisterMode ? 'Daftar' : 'Masuk'}
            </Button>
          </form>
          <div className="mt-6 text-center pt-4 border-t">
            <button 
              onClick={() => { setIsRegisterMode(!isRegisterMode); setErrorMessage(null); }} 
              className="text-sm text-primary font-bold hover:underline"
              suppressHydrationWarning
            >
              {isRegisterMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar jadi kontributor'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SEORequirement({ label, met }: { label: string, met: boolean | string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={cn("text-[11px] leading-tight", met ? "text-slate-700" : "text-slate-400")}>{label}</span>
      {met ? <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" /> : <XCircle className="h-4 w-4 text-slate-200 flex-shrink-0" />}
    </div>
  );
}
