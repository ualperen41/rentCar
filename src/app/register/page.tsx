"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const authError = searchParams.get("error");
    if (authError) {
      if (authError === "OAuthSignin" || authError === "OAuthCallback" || authError === "OAuthCreateAccount") {
        setError("Google ile bağlantı kurulamadı. '.env.local' dosyasındaki GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET anahtarlarını kontrol edin.");
      } else {
        setError("Kayıt sırasında bir hata oluştu: " + authError);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Girdiğiniz şifreler eşleşmiyor. Lütfen kontrol edin.");
      return;
    }

    if (password.length < 6) {
      setError("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    if (!agreeTerms) {
      setError("Üyelik ve kiralama sözleşmesini onaylamanız gerekmektedir.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Kayıt işlemi tamamlanamadı.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      // Auto-login with credentials
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });

      if (!signInRes?.error) {
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
      } else {
        router.push("/login");
      }
    } catch {
      setError("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
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
          <span className="text-xs text-on-surface-variant hidden sm:inline">Zaten üye misiniz?</span>
          <Link
            href="/login"
            className="text-xs font-semibold text-primary hover:text-primary-container transition-colors"
          >
            Giriş Yap
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-[1240px] mx-auto">
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            {/* Visual Column */}
            <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between p-10 overflow-hidden bg-inverse-surface text-inverse-on-surface">
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40 transition-transform duration-1000 scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/60 to-transparent" />
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                  <span className="text-[11px] font-semibold text-secondary-fixed tracking-wider uppercase">
                    Ayrıcalıklı Filo Portalı
                  </span>
                </div>
                <span className="text-xs font-mono text-surface-container-highest/60">02 // KAYIT</span>
              </div>

              <div className="relative z-10 space-y-6 my-auto">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-secondary-container">
                    {"★★★★★"}
                  </div>
                  <h3 className="text-2xl font-bold text-inverse-on-surface leading-tight">
                    Türkiye Genelinde Anahtarsız ve Güvenilir Teslimat
                  </h3>
                  <p className="text-sm text-surface-dim">
                    Özel araç taşıyıcı teslimatı, kapsamlı teminat güvencesi ve 7/24 kişisel konsiyerj desteği.
                  </p>
                </div>

                <div className="bg-surface-container-lowest/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold font-mono text-inverse-on-surface">120.400+</p>
                      <p className="text-xs text-secondary-container">Doğrulanmış Aktif VIP Sürücü</p>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-inverse-surface text-xs font-bold">
                        MK
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-bold">
                        AB
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold">
                        LB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-2 flex items-center justify-between text-surface-dim text-xs">
                <span>Kurumsal Güvenlik Standartı</span>
                <span className="font-mono text-[11px]">ISO/IEC 27001</span>
              </div>
            </div>

            {/* Registration Interaction Desk */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-surface-container-lowest">
              <div className="w-full">
                <div className="flex items-center justify-between pb-2">
                  <div className="inline-flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Doğrudan Filo Kaydı
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant">Adım 01 / 02</span>
                </div>

                <h1 className="text-3xl font-bold text-on-surface mt-2 tracking-tight">
                  Morent Hesabınızı Oluşturun
                </h1>
                <p className="text-sm text-on-surface-variant mt-1">
                  Prestijli, egzotik ve yüksek performanslı 450&apos;den fazla lüks araca anında rezervasyon yapın.
                </p>

                {/* Social Button */}
                <div className="mt-6">
                  <button
                    onClick={handleGoogleSignUp}
                    type="button"
                    className="w-full py-3 px-4 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-xl flex items-center justify-center gap-3 border border-outline-variant/30 text-sm font-semibold shadow-sm text-on-surface cursor-pointer"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google ile Kayıt Ol</span>
                  </button>
                </div>

                <div className="relative my-6 flex items-center justify-center">
                  <div className="w-full h-px bg-outline-variant/30" />
                  <span className="absolute bg-surface-container-lowest px-4 text-[11px] font-mono text-on-surface-variant uppercase tracking-widest">
                    veya kurumsal bilgilerle kaydolun
                  </span>
                </div>

                {error && (
                  <div className="mb-4 p-4 rounded-xl bg-error-container text-on-error-container text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">error</span>
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-4 rounded-xl bg-primary-container text-on-primary-container text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                    <span>Hesabınız başarıyla oluşturuldu! Ana sayfaya yönlendiriliyorsunuz...</span>
                  </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface flex justify-between" htmlFor="first-name">
                        <span>Ad</span>
                        <span className="text-primary text-[11px]">Zorunlu</span>
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Alperen"
                        className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-sm rounded-xl outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface flex justify-between" htmlFor="last-name">
                        <span>Soyad</span>
                        <span className="text-primary text-[11px]">Zorunlu</span>
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Buğra"
                        className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-sm rounded-xl outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface" htmlFor="reg-email">
                      E-Posta Adresi
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alperen@morent.com"
                      className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-sm rounded-xl outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface" htmlFor="reg-password">
                        Güvenlik Şifresi
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="reg-password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-4 pr-10 py-2.5 bg-surface-container-low text-on-surface text-sm rounded-xl outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-outline hover:text-on-surface p-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-on-surface" htmlFor="confirm-password">
                        Şifreyi Onayla
                      </label>
                      <input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-2.5 bg-surface-container-low text-on-surface text-sm rounded-xl outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                      />
                      <span className="text-xs text-on-surface-variant leading-relaxed">
                        Morent&apos;in{" "}
                        <a href="#" className="text-primary hover:underline font-semibold">
                          Üyelik İlkeleri
                        </a>
                        , Sürücü Gizlilik Protokolü ve Kapsamlı Güvenlik Sözleşmesi&apos;ni kabul ediyorum.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
                  >
                    <span>{loading ? "Hesap Oluşturuluyor..." : "VIP Hesabımı Oluştur"}</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-on-surface-variant">
                    Zaten kayıtlı bir hesabınız var mı?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-primary hover:text-primary-container transition-colors ml-1"
                    >
                      Buradan Giriş Yapın
                    </Link>
                  </p>
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

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
