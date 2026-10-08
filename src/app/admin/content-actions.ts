"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const slug = z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().trim().min(2).max(5000);
const list = (value: string) => value.split("\n").map(item => item.trim()).filter(Boolean).slice(0, 20);
const checked = (form: FormData, name: string) => form.get(name) === "on";

export async function saveService(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ id: z.string().optional(), areaId: z.string().min(1), name: z.string().trim().min(2).max(160), slug, summary: z.string().trim().min(10).max(400), description: text, appliesWhen: text, documents: z.string().max(3000), steps: z.string().max(3000), faqs: z.string().max(5000) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/contenido?error=servicio");
  const input = parsed.data;
  const data = { areaId: input.areaId, name: input.name, slug: input.slug, summary: input.summary, description: input.description, appliesWhen: input.appliesWhen, documents: list(input.documents), steps: list(input.steps), faqs: list(input.faqs).map(line => { const [question, ...answer] = line.split("|"); return { question: question.trim(), answer: answer.join("|").trim() }; }).filter(item => item.question && item.answer), published: checked(formData, "published"), isEmergency: checked(formData, "isEmergency") };
  try { if (input.id) await prisma.service.update({ where: { id: input.id }, data }); else await prisma.service.create({ data }); }
  catch { redirect("/admin/contenido?error=servicio"); }
  revalidatePath("/servicios"); revalidatePath("/admin/contenido");
  redirect("/admin/contenido?saved=servicio");
}

export async function saveCaseStudy(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ id: z.string().optional(), areaId: z.string().min(1), title: z.string().trim().min(3).max(160), problem: text, strategy: text, result: text, duration: z.string().trim().min(2).max(100) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success || (checked(formData, "published") && !checked(formData, "consented"))) redirect("/admin/contenido?error=caso");
  const data = { areaId: parsed.data.areaId, title: parsed.data.title, problem: parsed.data.problem, strategy: parsed.data.strategy, result: parsed.data.result, duration: parsed.data.duration, consented: checked(formData, "consented"), published: checked(formData, "published") };
  if (parsed.data.id) await prisma.caseStudy.update({ where: { id: parsed.data.id }, data }); else await prisma.caseStudy.create({ data });
  revalidatePath("/casos-de-exito"); revalidatePath("/admin/contenido");
  redirect("/admin/contenido?saved=caso");
}

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ id: z.string().optional(), author: z.string().trim().min(1).max(100), text: z.string().trim().min(10).max(1000), date: z.iso.date(), source: z.string().trim().min(2).max(200) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success || (checked(formData, "published") && !checked(formData, "consented"))) redirect("/admin/contenido?error=testimonio");
  const data = { author: parsed.data.author, text: parsed.data.text, date: new Date(`${parsed.data.date}T00:00:00Z`), source: parsed.data.source, consented: checked(formData, "consented"), published: checked(formData, "published") };
  if (parsed.data.id) await prisma.testimonial.update({ where: { id: parsed.data.id }, data }); else await prisma.testimonial.create({ data });
  revalidatePath("/"); revalidatePath("/admin/contenido");
  redirect("/admin/contenido?saved=testimonio");
}

export async function savePost(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ id: z.string().optional(), title: z.string().trim().min(3).max(160), slug, summary: z.string().trim().min(10).max(400), content: z.string().trim().min(20).max(20000) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/contenido?error=guia");
  const data = { title: parsed.data.title, slug: parsed.data.slug, summary: parsed.data.summary, content: parsed.data.content, published: checked(formData, "published") };
  try { if (parsed.data.id) await prisma.post.update({ where: { id: parsed.data.id }, data }); else await prisma.post.create({ data }); }
  catch { redirect("/admin/contenido?error=guia"); }
  revalidatePath("/guias"); revalidatePath("/admin/contenido");
  redirect("/admin/contenido?saved=guia");
}
