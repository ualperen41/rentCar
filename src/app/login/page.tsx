"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authError = searchParams.get("error");
    if (authError) {
      if (authError === "OAuthSignin" || authError === "OAuthCallback" || authError === "OAuthCreateAccount") {
        setError("Google ile giriş yapılamadı. Google Client ID ve Secret anahtarlarınızı '.env.local' dosyasına tanımlamalısınız.");
      } else if (authError === "Configuration") {
        setError("Sunucu kimlik doğrulama yapılandırma hatası. Lütfen Google OAuth anahtarlarını kontrol edin.");
      } else if (authError === "AccessDenied") {
        setError("Erişim reddedildi.");
      } else {
        setError("Giriş sırasında bir hata oluştu: " + authError);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error === "CredentialsSignin" ? "E-posta veya şifre hatalı." : res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Giriş yapılırken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface font-body-md text-on-surface">
      {/* Header */}
      <header className="w-full py-6 px-6 max-w-[1440px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-2xl text-primary tracking-tight">MORENT</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-on-surface-variant hidden sm:inline">VIP Müşteri Girişi</span>
          <Link
            href="/cars"
            className="text-xs font-semibold text-primary hover:text-primary-container transition-colors"
          >
            Filoyu İncele
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-[1240px] mx-auto">
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
            {/* Visual Luxury Column */}
            <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-10 overflow-hidden bg-inverse-surface text-inverse-on-surface">
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40 transition-transform duration-1000 scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/60 to-transparent" />
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />

              {/* Upper Showcase Spec Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                  <span className="text-[11px] font-semibold text-secondary-fixed tracking-wider uppercase">
                    Şifreli VIP Giriş
                  </span>
                </div>
                <span className="text-xs font-mono text-surface-container-highest/60">01 // FİLO ERİŞİMİ</span>
              </div>

              {/* Middle Telemetry HUD */}
              <div className="relative z-10 my-auto py-6">
                <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-4 mb-6 shadow-sm border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-surface-container-highest/80 uppercase tracking-wider font-semibold">
                      Aktif Filo Durumu
                    </span>
                    <span className="text-sm font-bold font-mono text-secondary-container">142 Araç Hazır</span>
                  </div>
                  <svg className="w-full h-10 text-secondary-container" fill="none" viewBox="0 0 200 40">
                    <path
                      d="M0 32 L35 28 L70 34 L105 16 L140 22 L175 6 L200 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0 32 L35 28 L70 34 L105 16 L140 22 L175 6 L200 12 V40 H0 Z"
                      fill="currentColor"
                      fillOpacity="0.12"
                    />
                  </svg>
                  <div className="flex justify-between items-center mt-2 text-surface-dim text-[11px] font-mono">
                    <span>İSTANBUL</span>
                    <span>ANKARA</span>
                    <span>İZMİR</span>
                    <span>BODRUM</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {"★★★★★"}
                  </div>
                  <p className="text-base text-inverse-on-surface leading-snug font-medium">
                    “Anahtarsız teslimat ve VIP konsiyerj hizmeti benzersiz. Morent seyahat standardımızı baştan tanımladı.”
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                      AB
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-surface-bright">Alperen Buğra</p>
                      <p className="text-[11px] text-surface-dim">Doğrulanmış VIP Üye • İstanbul</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Footer */}
              <div className="relative z-10 pt-2 flex items-center justify-between text-surface-dim text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-secondary-container">verified_user</span>
                  Sıfır Güvenlik Açığı (Zero-Trust)
                </span>
                <span className="font-mono text-[11px]">v4.9.2</span>
              </div>
            </div>

            {/* Main Login Interaction Panel */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div className="w-full max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-semibold text-xs tracking-wider uppercase">
                    <span className="material-symbols-outlined text-sm">shield</span>
                    Tekrar Hoş Geldiniz
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>Portal: MOR-882</span>
                  </div>
                </div>

                <div className="space-y-1 mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
                    Morent Hesabınıza Giriş Yapın
                  </h1>
                  <p className="text-sm text-on-surface-variant">
                    Özel araç filonuzu ve rezervasyonlarınızı yönetmek için bilgilerinizi girin.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">error</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* OAuth: Google */}
                <div className="mb-6">
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full py-3 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 transition-all flex items-center justify-center gap-3 text-on-surface font-semibold text-sm shadow-sm cursor-pointer"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.15C3.25 21.37 7.34 24 12 24z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.15z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.27 6.59l4.01 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google ile Devam Et</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center my-6">
                  <div className="w-full h-px bg-outline-variant/30" />
                  <span className="absolute px-4 bg-surface-container-lowest text-on-surface-variant text-[11px] font-mono uppercase tracking-wider">
                    veya e-posta ile giriş yapın
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-on-surface" htmlFor="email">
                      E-Posta Adresi
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-outline text-lg pointer-events-none">
                        mail
                      </span>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="musteri@morent.com"
                        className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-surface-container-lowest text-on-surface text-sm rounded-xl pl-11 pr-4 py-3 transition-colors outline-none border border-transparent focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-on-surface" htmlFor="password">
                      Güvenlik Şifresi / PIN
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-outline text-lg pointer-events-none">
                        lock
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-surface-container-low hover:bg-surface-container focus:bg-surface-container-lowest text-on-surface text-sm rounded-xl pl-11 pr-12 py-3 transition-colors outline-none border border-transparent focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-outline hover:text-on-surface transition-colors p-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                      />
                      <span className="text-xs text-on-surface-variant">Bu cihazda 30 gün boyunca hatırla</span>
                    </label>
                    <a href="#" className="text-xs font-semibold text-primary hover:underline">
                      Şifremi unuttum?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
                  >
                    <span>{loading ? "Giriş Yapılıyor..." : "Hesabıma Giriş Yap"}</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-on-surface-variant">
                    Morent&apos;te yeni misiniz?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-primary hover:text-primary-container transition-colors ml-1"
                    >
                      VIP Üyelik Başvurusu / Kayıt Ol
                    </Link>
                  </p>
                </div>
              </div>

              {/* Trust Badge Bar */}
              <div className="w-full max-w-xl mx-auto mt-8 pt-4 bg-surface-container-low/50 rounded-xl p-3 border border-outline-variant/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs text-on-surface-variant">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">fingerprint</span>
                    <span>Biyometrik Uyumlu</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">verified</span>
                    <span>TÜV SÜD Teminatlı</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">lock</span>
                    <span>256-Bit Şifreleme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 border-t border-outline-variant/20 bg-surface-container-lowest/60 text-center">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-on-surface-variant text-xs">
          <p>© 2026 Morent Otomotiv Luxury Group S.A.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-on-surface transition-colors">Güvenlik</a>
            <a href="#" className="hover:text-on-surface transition-colors">Kullanım Koşulları</a>
            <a href="#" className="hover:text-on-surface transition-colors">Destek</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
