// The ten-day campaign uses Morocco time and one shared deadline for every visitor.
export const blackFridayStartsAt = Date.parse('2026-11-17T00:00:00+01:00');
export const blackFridayEndsAt = blackFridayStartsAt + 10 * 24 * 60 * 60 * 1000;

export const getBlackFridayCountdown = (now: number) => {
	const remaining = Math.max(0, Math.ceil((blackFridayEndsAt - Math.max(now, blackFridayStartsAt)) / 1000));
	return {
		phase: now < blackFridayStartsAt ? 'upcoming' : now < blackFridayEndsAt ? 'active' : 'ended',
		days: Math.floor(remaining / 86400),
		hours: Math.floor((remaining % 86400) / 3600),
		minutes: Math.floor((remaining % 3600) / 60),
		seconds: remaining % 60,
	};
};
