import assert from 'node:assert/strict';
import test from 'node:test';
import { blackFridayStartsAt, blackFridayEndsAt, getBlackFridayCountdown } from './blackFriday';

test('Black Friday runs for ten days from November 17 at midnight in Morocco', () => {
	assert.equal(new Date(blackFridayStartsAt).toISOString(), '2026-11-16T23:00:00.000Z');
	assert.equal(new Date(blackFridayEndsAt).toISOString(), '2026-11-26T23:00:00.000Z');
	assert.equal(blackFridayEndsAt - blackFridayStartsAt, 10 * 24 * 60 * 60 * 1000);
});

test('before the campaign starts, the countdown shows the full ten-day offer duration', () => {
	assert.deepEqual(getBlackFridayCountdown(blackFridayStartsAt - 1), {
		phase: 'upcoming',
		days: 10,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	assert.deepEqual(getBlackFridayCountdown(blackFridayStartsAt), {
		phase: 'active',
		days: 10,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
});

test('remaining time uses the shared deadline and crosses day boundaries correctly', () => {
	assert.deepEqual(getBlackFridayCountdown(blackFridayStartsAt + 1000), {
		phase: 'active',
		days: 9,
		hours: 23,
		minutes: 59,
		seconds: 59,
	});
	assert.deepEqual(getBlackFridayCountdown(Date.parse('2026-11-20T12:34:56+01:00')), {
		phase: 'active',
		days: 6,
		hours: 11,
		minutes: 25,
		seconds: 4,
	});
});

test('the final partial second remains visible and expiry never resets the campaign', () => {
	assert.deepEqual(getBlackFridayCountdown(blackFridayEndsAt - 1), {
		phase: 'active',
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 1,
	});
	for (const now of [blackFridayEndsAt, blackFridayEndsAt + 1000, blackFridayEndsAt + 86400000]) {
		assert.deepEqual(getBlackFridayCountdown(now), {
			phase: 'ended',
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		});
	}
});
