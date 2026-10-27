// 360° viewer frame arithmetic. Run with `npm test`.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { frameForDrag, nearbyFrames, nearestLoadable, pixelsPerFrame, wrapFrame } from "./rotation.ts";

describe("frame arithmetic", () => {
  it("wraps round the circle in both directions", () => {
    assert.equal(wrapFrame(35, 1, 36), 0);
    assert.equal(wrapFrame(0, -1, 36), 35);
    assert.equal(wrapFrame(3, -40, 36), 35);
    assert.equal(wrapFrame(0, 5, 0), 0);
  });

  it("steps one frame per drag interval, the way the hand moves", () => {
    assert.equal(frameForDrag(10, 0, 20, 36, "clockwise"), 10);
    assert.equal(frameForDrag(10, 19, 20, 36, "clockwise"), 10, "less than one interval does not move");
    assert.equal(frameForDrag(10, 40, 20, 36, "clockwise"), 8);
    assert.equal(frameForDrag(10, 40, 20, 36, "anticlockwise"), 12);
    assert.equal(frameForDrag(0, -60, 20, 36, "clockwise"), 3);
  });

  it("goes all the way round in about one and a half stage widths", () => {
    const px = pixelsPerFrame(800, 36);
    assert.equal(frameForDrag(0, px * 36, px, 36, "anticlockwise"), 0);
    assert.ok(Math.abs(px * 36 - 1200) < 1);
    assert.equal(pixelsPerFrame(10, 36), 4, "never less than four pixels a frame");
  });

  it("lists nearby frames nearest first, without repeats", () => {
    assert.deepEqual(nearbyFrames(0, 36, 2), [0, 1, 35, 2, 34]);
    assert.deepEqual(nearbyFrames(1, 3, 5), [1, 2, 0]);
  });

  it("skips frames that failed to load", () => {
    assert.equal(nearestLoadable(4, 8, new Set([4])), 5);
    assert.equal(nearestLoadable(4, 8, new Set([4, 5])), 3);
    assert.equal(nearestLoadable(0, 3, new Set([0, 1, 2])), null);
  });
});
