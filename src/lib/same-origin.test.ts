import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isCrossOrigin } from "./same-origin";

describe("isCrossOrigin", () => {
  it("allows a request with no Origin header", () => {
    assert.equal(isCrossOrigin(null, "practice.example"), false);
  });

  it("allows an Origin whose host matches", () => {
    assert.equal(isCrossOrigin("https://practice.example", "practice.example"), false);
  });

  it("rejects an Origin from another host", () => {
    assert.equal(isCrossOrigin("https://evil.example", "practice.example"), true);
  });

  it("rejects an Origin that is not a URL instead of throwing", () => {
    assert.equal(isCrossOrigin("null", "practice.example"), true);
    assert.equal(isCrossOrigin("not a url", "practice.example"), true);
  });
});
