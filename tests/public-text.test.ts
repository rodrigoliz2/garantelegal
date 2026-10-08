import { describe, expect, it } from "vitest";
import { publicText } from "../src/lib/public-text";

describe("publicText", () => {
  it("removes internal draft markers without leaving stray punctuation", () => {
    expect(publicText("[BORRADOR JURÍDICO: validar]. El amparo es un proceso.")).toBe("El amparo es un proceso.");
    expect(publicText("Texto de prueba. [BORRADOR JURÍDICO: validar por el abogado titular]")).toBe("Texto de prueba.");
    expect(publicText("Correo: [PENDIENTE: correo]")).toBe("Correo:");
  });
});
