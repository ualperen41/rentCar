import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 pt-16 pb-12 mt-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-outline-variant/20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-extrabold text-2xl text-primary tracking-tight">MORENT</span>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Vizyonumuz, araç kiralama süreçlerinde en üst düzey konfor, şeffaflık ve lüks standartları sunmaktır. Türkiye geneli anahtarsız ve güvenli VIP filo kiralama.
            </p>
          </div>

          {/* Links 1 */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-on-surface">Hakkımızda</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><Link href="/" className="hover:text-primary transition-colors">Nasıl Çalışır?</Link></li>
              <li><Link href="/cars" className="hover:text-primary transition-colors">Öne Çıkanlar</Link></li>
              <li><Link href="/cars" className="hover:text-primary transition-colors">İş Ortaklığı</Link></li>
              <li><Link href="/cars" className="hover:text-primary transition-colors">Kurumsal İlişkiler</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-on-surface">Topluluk</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">Etkinlikler</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Podcast</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Arkadaşını Davet Et</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-on-surface">Sosyal Medya</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© 2026 MORENT. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6 font-semibold">
            <a href="#" className="hover:text-on-surface transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-on-surface transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
