import { describe, expect, it } from "vitest";
import { buildApiUrl, normalizeApiBaseUrl } from "./api-url";

describe("registration API URL handling", () => {
  it("builds registration URLs from an API origin", () => {
    expect(buildApiUrl("https://api.example.com", "/auth/register-business")).toBe(
      "https://api.example.com/api/v1/auth/register-business"
    );
  });

  it("does not duplicate the API prefix when API_URL already includes it", () => {
    expect(buildApiUrl("https://api.example.com/api/v1", "/auth/register-business")).toBe(
      "https://api.example.com/api/v1/auth/register-business"
    );
  });

  it("accepts the health endpoint as the configured API URL", () => {
    expect(buildApiUrl("https://api.example.com/api/v1/health", "/auth/register-business")).toBe(
      "https://api.example.com/api/v1/auth/register-business"
    );
  });

  it("keeps custom base paths before the API prefix", () => {
    expect(buildApiUrl("api.example.com/platform/api/v1", "auth/register-business")).toBe(
      "https://api.example.com/platform/api/v1/auth/register-business"
    );
  });

  it("defaults localhost URLs without a scheme to http", () => {
    expect(normalizeApiBaseUrl("localhost:3001/api/v1/health")).toBe("http://localhost:3001");
  });
});
