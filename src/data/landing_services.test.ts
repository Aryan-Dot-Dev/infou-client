import { describe, expect, test } from "bun:test";
import { landingServiceHighlights } from "./landing_services";

describe("landing service highlights", () => {
  test("summarizes the six primary service channels for the landing page", () => {
    expect(landingServiceHighlights).toHaveLength(6);
    expect(landingServiceHighlights.map((service) => service.title)).toEqual([
      "Government Grant Advisory",
      "Startup Scheme Matching",
      "Bank Loan Support",
      "Investor Connect",
      "Incubation Access",
      "Private Funding Access",
    ]);
    expect(new Set(landingServiceHighlights.map((service) => service.code)).size).toBe(6);
  });
});
