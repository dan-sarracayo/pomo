"use client";

import "./page.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Selection from "@/components/Selection";
import Timer from "@/components/Timer";

export default function Home() {
	// Page state is 'select' or 'timer'.
	const [pageState, setPageState] = useState("select");

	// Mode is either 'focus' or 'break'.
	const [mode, setMode] = useState("focus");

	// ToDo: replace this with a hook that uses localstorage.
	const [endDate, setEndDate] = useState(undefined);

	// Countdown to be rendered.
	const [countdown, setCountdown] = useState([]);

	/**
	 * Handles starting a timer.
	 *
	 * @param {number} period - the number of minutes the timer will run for.
	 */
	const handleStartTimer = useCallback(
		(period) => {
			setPageState("timer");
			let _endDate = new Date();
			_endDate.setMinutes(_endDate.getMinutes() + period);
			setEndDate(_endDate);
		},
		[setEndDate]
	);

	const handleEndTimer = useCallback(() => {
		// Clear end date.
		setEndDate(undefined);

		// Set view back to selection?
		setPageState("select");
	}, [setEndDate, setPageState]);

	/**
	 * Heartbeat manager, creates intervals for countdowns.
	 */
	useEffect(() => {
		if (!endDate) return;

		/**
		 * Calculates the time remaining in various human readable formats.
		 * @returns {[minutes, seconds, milliseconds]} - The amount of time remaining broken down.
		 */
		const calcTime = () => {
			// Remaining time drawn out to minutes and seconds.
			const msRemaining = endDate - new Date();
			let minutes = Math.ceil(msRemaining / 1000 / 60) - 1;
			let seconds = Math.ceil((msRemaining / 1000) % 60);

			// Transfer the 60 seconds over to a minute.
			if (seconds === 60) {
				seconds = 0;
				minutes += 1;
			}

			// Return in order.
			return [minutes, seconds, msRemaining];
		};

		setCountdown(calcTime());

		const heartbeat = setInterval(() => {
			const calc = calcTime();
			if (calc[2] < 0) {
				clearInterval(heartbeat);
				handleEndTimer();
				return;
			}
			setCountdown(calc);
		}, 1000);

		return () => clearInterval(heartbeat);
	}, [endDate, handleEndTimer]);

	/**
	 * Decides which UI to render, based on page state.
	 */
	const RenderedComponent = useMemo(() => {
		switch (pageState) {
			case "timer":
				return (
					<Timer
						countdown={countdown}
						mode={mode}
						onCancel={() => handleEndTimer()}
					/>
				);
			default:
				return (
					<Selection
						onSelect={handleStartTimer}
						onModeChange={setMode}
						mode={mode}
					/>
				);
		}
	}, [pageState, countdown, mode, handleStartTimer, handleEndTimer, setMode]);

	return (
		<main>
			<div>{RenderedComponent}</div>
			<div
				className={`tomatoBackground ${
					pageState === "select" ? "small" : "full"
				} ${mode === "focus" ? "red" : "green"}`}
			></div>
		</main>
	);
}
