'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Inisialisasi Firebase secara aman.
// Selama build Next.js atau pra-render, variabel lingkungan mungkin tidak tersedia.
// Pengecekan ini mencegah error "auth/invalid-api-key" yang menghentikan proses build di Vercel.
const hasConfig = typeof window !== 'undefined' 
  ? !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
  : (!!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "");

const app = hasConfig
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : (getApps().length > 0 ? getApp() : null);

// Jika app tidak ada (misal saat build tanpa env vars), kita berikan null.
// Komponen dan hooks sudah diperbarui untuk menangani kondisi ini secara anggun.
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

export { app, auth, db };
