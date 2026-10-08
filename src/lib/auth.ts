import { compare } from "bcryptjs";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [CredentialsProvider({
    name: "Acceso del despacho",
    credentials: { email: { label: "Correo", type: "email" }, password: { label: "Contraseña", type: "password" } },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      const admin = await prisma.adminUser.findUnique({ where: { email: credentials.email.toLocaleLowerCase() } });
      if (!admin?.active || !await compare(credentials.password, admin.passwordHash)) return null;
      return { id: admin.id, name: admin.name, email: admin.email };
    }
  })]
};

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/admin/login");
  const admin = await prisma.adminUser.findUnique({ where: { email: session.user.email } });
  if (!admin?.active) redirect("/admin/login");
  return admin;
}
