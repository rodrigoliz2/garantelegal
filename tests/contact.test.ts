import { describe, expect, it } from "vitest";
import { appointmentMessage, emergencyMessage, serviceMessage } from "../src/lib/contact";

describe("contact messages", () => {
  it("gives the emergency contact useful context", () => expect(emergencyMessage).toContain("Lugar: __"));
  it("names the selected service", () => expect(serviceMessage("Amparo indirecto")).toContain("Amparo indirecto"));
  it("includes scheduling choices", () => expect(appointmentMessage("Contratos", "lunes", "llamada")).toContain("lunes"));
});
