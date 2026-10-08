import { z } from "zod";

export const leadSchema = z.object({
  clientName: z.string().trim().min(2).max(100),
  clientPhone: z.string().trim().regex(/^[+\d\s()-]{10,22}$/),
  clientEmail: z.union([z.email(), z.literal("")]).optional(),
  message: z.string().trim().min(10).max(500),
  privacyAccepted: z.literal(true),
  turnstileToken: z.string().min(1)
});
