import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const areas = [
  { name: "Urgencias", slug: "urgencias", description: "Orientación ante detenciones, arresto por alcoholímetro y vehículos retenidos.", services: [
    ["Amparo contra arresto por alcoholímetro", "amparo-arresto-alcoholimetro", "Revisión de las opciones de defensa frente a un arresto por alcoholímetro."],
    ["Asistencia en detenciones ante juez cívico o Ministerio Público", "asistencia-detenciones", "Acompañamiento jurídico para conocer la situación de una persona detenida."],
    ["Liberación de vehículo del corralón", "liberacion-vehiculo-corralon", "Orientación sobre los requisitos y actos relacionados con un vehículo retenido."],
    ["Localización de persona detenida", "localizacion-persona-detenida", "Apoyo para identificar a la autoridad y el lugar donde se encuentra una persona."]
  ] },
  { name: "Administrativo", slug: "administrativo", description: "Defensa ante multas, sanciones, permisos y decisiones de autoridad.", services: [
    ["Impugnación de multas de tránsito y fotomultas", "impugnacion-multas-transito", "Revisión de una boleta o sanción para identificar las vías disponibles."],
    ["Clausuras, multas y sanciones a negocios", "clausuras-sanciones-negocios", "Revisión del acto de autoridad y de las opciones de respuesta."],
    ["Licencias y permisos", "licencias-permisos", "Acompañamiento en solicitudes, negativas y controversias sobre autorizaciones."],
    ["Defensa ante autoridades fiscales", "defensa-autoridades-fiscales", "Análisis de requerimientos y actos de autoridades fiscales."],
    ["Juicio contencioso administrativo (nulidad)", "juicio-contencioso-administrativo", "Evaluación de la vía judicial frente a determinados actos administrativos."],
    ["Responsabilidad patrimonial del Estado", "responsabilidad-patrimonial-estado", "Revisión de posibles reclamaciones por actividad administrativa irregular."]
  ] },
  { name: "Constitucional", slug: "constitucional", description: "Análisis de amparo y protección de derechos frente a actos de autoridad.", services: [
    ["Amparo indirecto", "amparo-indirecto", "Evaluación del amparo frente a ciertos actos de autoridad."],
    ["Amparo directo", "amparo-directo", "Revisión de resoluciones definitivas y de la vía de amparo correspondiente."],
    ["Suspensión del acto reclamado", "suspension-acto-reclamado", "Análisis de la posibilidad de solicitar una medida temporal en amparo."],
    ["Amparo contra leyes y actos de autoridad", "amparo-leyes-actos-autoridad", "Estudio del acto o norma y sus posibles efectos en los derechos de la persona."],
    ["Defensa de derechos humanos", "defensa-derechos-humanos", "Orientación sobre vías de defensa ante posibles afectaciones de derechos."]
  ] },
  { name: "Civil", slug: "civil", description: "Asuntos entre particulares, contratos, bienes y obligaciones.", services: [
    ["Contratos", "contratos", "Redacción, revisión y análisis de contratos civiles."],
    ["Arrendamiento y desocupación", "arrendamiento-desocupacion", "Orientación en conflictos de uso, pago o entrega de inmuebles."],
    ["Cobro de adeudos", "cobro-adeudos", "Evaluación de documentos y opciones para reclamar un adeudo."],
    ["Daños y responsabilidad civil", "danos-responsabilidad-civil", "Revisión de hechos y documentos relativos a una posible reclamación."],
    ["Sucesiones y testamentos", "sucesiones-testamentos", "Acompañamiento en organización patrimonial y trámites sucesorios."],
    ["Asuntos familiares (divorcio, pensión, custodia)", "asuntos-familiares", "Servicio sujeto a confirmación de que el despacho atiende esta materia."]
  ] },
  { name: "Mercantil", slug: "mercantil", description: "Obligaciones comerciales, sociedades y recuperación de cartera.", services: [
    ["Cobro de pagarés y títulos de crédito (juicio ejecutivo mercantil)", "cobro-pagares-titulos", "Revisión de títulos de crédito y posibles vías de cobro."],
    ["Constitución de sociedades", "constitucion-sociedades", "Orientación para estructurar una sociedad comercial."],
    ["Contratos mercantiles", "contratos-mercantiles", "Redacción y revisión de acuerdos comerciales."],
    ["Conflictos entre socios", "conflictos-socios", "Análisis de documentos societarios y opciones de solución."],
    ["Recuperación de cartera", "recuperacion-cartera", "Diseño de acciones para gestionar cuentas pendientes."],
    ["Concursos mercantiles", "concursos-mercantiles", "Orientación inicial sobre procedimientos relacionados con insolvencia comercial."]
  ] }
] as const;

export function serviceDescription(summary: string) {
  return `${summary} El alcance concreto depende de los hechos, de la autoridad que intervino y de los documentos de tu caso; lo revisamos contigo en la consulta.`;
}

export function serviceAppliesWhen(name: string) {
  return `Conviene consultarnos si tu asunto tiene que ver con ${name.toLocaleLowerCase("es-MX")}. En la primera consulta confirmamos si la vía procede y qué se necesita para avanzar.`;
}

export const guides = [
  { slug: "que-hacer-alcoholimetro", title: "Qué hacer ante una detención por alcoholímetro", summary: "Datos útiles para pedir orientación jurídica si una persona fue arrestada tras una prueba de alcoholímetro.", content: "Si una persona fue detenida tras una prueba de alcoholímetro, anota el lugar, la hora y la autoridad que intervino, y pregunta a qué centro de sanciones administrativas la trasladarán.\n\nConserva la boleta o cualquier documento que te entreguen. Llámanos o escríbenos por WhatsApp para revisar el caso: las reglas y las vías de defensa cambian según el estado y el municipio." },
  { slug: "como-impugnar-multa", title: "Cómo revisar una multa para impugnarla", summary: "Una guía inicial para ordenar la boleta, los hechos y los documentos antes de una consulta.", content: "Conserva la boleta completa y anota cuándo y dónde te la notificaron. Reúne fotografías, comprobantes y cualquier otro documento relacionado.\n\nEl plazo para impugnar y la autoridad competente dependen del lugar y del tipo de sanción, y el plazo suele correr desde la notificación. En la consulta revisamos si hay una vía de impugnación y qué documentos se necesitan." },
  { slug: "vehiculo-corralon", title: "Qué reunir si un vehículo fue enviado al corralón", summary: "Documentos y datos básicos para consultar la recuperación de un vehículo retenido.", content: "Identifica el depósito, la autoridad que ordenó el traslado y la boleta o el inventario que te entregaron. Ten a mano los documentos del vehículo y tu identificación.\n\nLos requisitos para liberarlo cambian según el estado y el motivo de la retención. Revisamos contigo la documentación y te explicamos los pasos a seguir." },
  { slug: "que-es-amparo", title: "Qué es un amparo", summary: "Explicación general de esta vía judicial y de por qué requiere revisar el acto concreto.", content: "El amparo es un juicio para pedir a un tribunal federal que proteja tus derechos frente a un acto de autoridad. No sirve para cualquier conflicto: procede contra ciertos actos y dentro de plazos estrictos.\n\nPara saber si procede en tu caso hacen falta los hechos, los documentos, la autoridad involucrada y las fechas. En la consulta revisamos los plazos y la vía adecuada." }
];

async function main() {
  for (const [areaIndex, entry] of areas.entries()) {
    const area = await prisma.practiceArea.upsert({ where: { slug: entry.slug }, update: { name: entry.name, description: entry.description, sortOrder: areaIndex }, create: { name: entry.name, slug: entry.slug, description: entry.description, sortOrder: areaIndex } });
    for (const [serviceIndex, [name, slug, summary]] of entry.services.entries()) {
      const isEmergency = entry.slug === "urgencias";
      await prisma.service.upsert({
        where: { areaId_slug: { areaId: area.id, slug } },
        update: { name, summary, sortOrder: serviceIndex },
        create: {
          areaId: area.id, name, slug, summary, sortOrder: serviceIndex, isEmergency,
          published: slug !== "asuntos-familiares",
          description: serviceDescription(summary),
          appliesWhen: serviceAppliesWhen(name),
          documents: ["Documento o aviso relacionado con el asunto, si lo tienes", "Identificación y datos de contacto", "Cronología breve de lo ocurrido"],
          steps: ["Escuchamos el contexto y revisamos los documentos disponibles", "Explicamos las vías posibles y el alcance del servicio", "Acordamos contigo los siguientes pasos"],
          faqs: [{ question: "¿Qué debo llevar a la consulta?", answer: "Los documentos que tengas y una cronología breve. Si no cuentas con todo, puedes consultar primero." }, { question: "¿Hay un resultado garantizado?", answer: "No. Cada caso depende de sus hechos, documentos y decisiones de la autoridad." }]
        }
      });
    }
  }

  for (let weekday = 1; weekday <= 5; weekday++) {
    for (const modality of ["IN_PERSON", "VIDEO", "PHONE"]) {
      await prisma.availabilityRule.upsert({ where: { weekday_startMinute_endMinute_modality: { weekday, startMinute: 540, endMinute: 1080, modality } }, update: { active: true }, create: { weekday, startMinute: 540, endMinute: 1080, modality } });
    }
  }

  for (const guide of guides) await prisma.post.upsert({ where: { slug: guide.slug }, update: {}, create: { ...guide, published: true } });

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required for the seed.");
  await prisma.adminUser.upsert({ where: { email }, update: { name: process.env.ADMIN_NAME || "Administrador", passwordHash: await hash(password, 12) }, create: { email, name: process.env.ADMIN_NAME || "Administrador", passwordHash: await hash(password, 12) } });
  console.log(`Semilla aplicada: ${areas.length} áreas de práctica, guías y administrador ${email}.`);
}

// Solo se ejecuta como script (npm run db:seed), no al importarse.
if (process.argv[1]?.endsWith("seed.ts")) main().finally(() => prisma.$disconnect());
