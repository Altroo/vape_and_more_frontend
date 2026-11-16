'use client';

import { useSyncExternalStore } from 'react';
import type { translations } from '@/data/translations';
import { getBlackFridayCountdown } from '@/utils/blackFriday';
import styles from './blackFridayCountdown.module.css';

const subscribeToClock = (onChange: () => void) => {
	const interval = window.setInterval(onChange, 1000);
	return () => window.clearInterval(interval);
};

const getClockSnapshot = () => Math.floor(Date.now() / 1000);
const getServerClockSnapshot = () => null;

type CountdownCopy = (typeof translations)['fr']['hero']['countdown'];

export const BlackFridayCountdown = ({ copy }: { copy: CountdownCopy }) => {
	const now = useSyncExternalStore(subscribeToClock, getClockSnapshot, getServerClockSnapshot);
	const countdown = now === null ? null : getBlackFridayCountdown(now * 1000);
	const message =
		countdown?.phase === 'upcoming' ? copy.startsOn : countdown?.phase === 'ended' ? copy.ended : copy.endsIn;

	return (
		<div className={styles.countdown} role="timer" aria-label={copy.title} aria-live="off">
			<p className={styles.title}>{copy.title}</p>
			<p className={styles.message}>{message}</p>
			<div className={styles.units} dir="ltr">
				{(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
					<div className={styles.unit} key={unit}>
						<strong>{countdown === null ? '--' : String(countdown[unit]).padStart(2, '0')}</strong>
						<span dir="auto">{copy[unit]}</span>
					</div>
				))}
			</div>
		</div>
	);
};
