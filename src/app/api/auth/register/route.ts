import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Geçersiz JSON formatı gönderildi." },
        { status: 400 }
      );
    }

    const { name, email, password } = body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { message: "İsim alanı zorunludur." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { message: "E-posta adresi zorunludur." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { message: "Lütfen geçerli bir e-posta adresi giriniz." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { message: "Şifre en az 6 karakter uzunluğunda olmalıdır." },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return NextResponse.json(
        { message: "Bu e-posta adresi ile kayıtlı bir kullanıcı zaten mevcut." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: name.trim(),
      email: trimmedEmail,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Kullanıcı başarıyla kaydedildi.",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);

    // Mongoose validation errors handling
    if (error?.name === "ValidationError") {
      const messages = Object.values(error.errors || {}).map((e: any) => e.message);
      return NextResponse.json(
        { message: messages.join(", ") || "Doğrulama hatası oluştu." },
        { status: 400 }
      );
    }

    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "Bu e-posta adresi zaten kullanımda." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Kayıt sırasında beklenmeyen bir hata meydana geldi." },
      { status: 500 }
    );
  }
}
