import { parseTimeString } from "./parseTimeString.js";

test("parseTimeString returns milliseconds to add for valid time string with hours, minutes, and seconds", () => {
    const timeString = "2h42m31s";
    const millisecondsToAdd = parseTimeString(timeString);
    expect(millisecondsToAdd).toBe(9751000); // 2 * 3600 * 1000 + 42 * 60 * 1000 + 31 * 1000
});

test("parseTimeString returns milliseconds to add for valid time string with minutes and seconds", () => {
    const timeString = "55m51s";
    const millisecondsToAdd = parseTimeString(timeString);
    expect(millisecondsToAdd).toBe(3351000); // 55 * 60 * 1000 + 51 * 1000
});

test("parseTimeString returns milliseconds to add for valid time string with only seconds", () => {
    const timeString = "45s";
    const millisecondsToAdd = parseTimeString(timeString);
    expect(millisecondsToAdd).toBe(45000); // 45 * 1000
});

test("parseTimeString throws error for invalid time string", () => {
    const invalidTimeString = "invalid";
    expect(() => parseTimeString(invalidTimeString)).toThrow("Invalid time string format");
});
