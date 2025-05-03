import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the available languages
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
  { code: 'ru', name: 'Русский' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'pt', name: 'Português' },
];

// Define the translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Basic translations for demonstration
// In a production environment, these would be loaded from JSON files or an API
const translations: Translations = {
  en: {
    welcome: 'Welcome to Free Millionaire Challenge',
    about: 'About',
    participants: 'Participants',
    register: 'Register',
    login: 'Login',
    dashboard: 'Dashboard',
    ads: 'Advertisements',
    whitepaper: 'Whitepaper',
    challenge: 'The Challenge',
    eligibility: 'Eligibility',
    home: 'Home',
    profile: 'Profile',
    logout: 'Logout',
    language: 'Language',
  },
  es: {
    welcome: 'Bienvenido al Desafío Free Millionaire',
    about: 'Acerca de',
    participants: 'Participantes',
    register: 'Registrarse',
    login: 'Iniciar Sesión',
    dashboard: 'Panel',
    ads: 'Anuncios',
    whitepaper: 'Libro Blanco',
    challenge: 'El Desafío',
    eligibility: 'Elegibilidad',
    home: 'Inicio',
    profile: 'Perfil',
    logout: 'Cerrar Sesión',
    language: 'Idioma',
  },
  fr: {
    welcome: 'Bienvenue au Défi Free Millionaire',
    about: 'À propos',
    participants: 'Participants',
    register: 'S\'inscrire',
    login: 'Connexion',
    dashboard: 'Tableau de Bord',
    ads: 'Annonces',
    whitepaper: 'Livre Blanc',
    challenge: 'Le Défi',
    eligibility: 'Éligibilité',
    home: 'Accueil',
    profile: 'Profil',
    logout: 'Déconnexion',
    language: 'Langue',
  },
  zh: {
    welcome: '欢迎参加免费百万富翁挑战',
    about: '关于',
    participants: '参与者',
    register: '注册',
    login: '登录',
    dashboard: '仪表板',
    ads: '广告',
    whitepaper: '白皮书',
    challenge: '挑战',
    eligibility: '资格',
    home: '首页',
    profile: '个人资料',
    logout: '登出',
    language: '语言',
  },
  // Add more language translations as needed
};

// Define the context type
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: typeof languages;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or use 'en' as default
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set document direction based on language for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English
    if (translations['en'] && translations['en'][key]) {
      return translations['en'][key];
    }
    
    // If no translation found, return the key
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages: languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};