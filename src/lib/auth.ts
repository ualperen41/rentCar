import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import User from "@/models/User";

export const auth = () => getServerSession(authOptions);

const providers: any[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "you@example.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Lütfen e-posta ve şifrenizi giriniz");
      }

      await connectDB();

      const user = await User.findOne({ email: credentials.email.toLowerCase() }).select("+password");

      if (!user || !user.password) {
        throw new Error("Bu e-posta ile kayıtlı kullanıcı bulunamadı");
      }

      const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);

      if (!isPasswordMatched) {
        throw new Error("Hatalı şifre girdiniz");
      }

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.avatar || "",
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;
        await connectDB();
        const existingUser = await User.findOne({ email: user.email.toLowerCase() });
        if (!existingUser) {
          await User.create({
            name: user.name || "Morent User",
            email: user.email.toLowerCase(),
            avatar: user.image || "",
            role: "user",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "user";
        token.image = user.image || (user as any).avatar || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        session.user.image = (token.image as string) || session.user.image || "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "morent_super_secret_development_jwt_key_2026_xyz123",
};
