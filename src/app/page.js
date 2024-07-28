"use client";

import "./page.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Selection from "@/components/Selection";
import Timer from "@/components/Timer";
import useLocalstorage from "@/hooks/useLocalstorage";

export default function Home() {
	const [pageState, setPageState] = useState("select");

	const [mode, setMode] = useLocalstorage("mode", "focus");

	const [endDate, setEndDate] = useLocalstorage("endDate", undefined);

	const [countdown, setCountdown] = useState([]);

	const [period, setPeriod] = useLocalstorage("period", 10);

	/**
	 * Handles starting a timer.
	 *
	 * @param {number} period - the number of minutes the timer will run for.
	 */
	const handleStartTimer = useCallback(() => {
		setPageState("timer");
		let _endDate = new Date();
		_endDate.setMinutes(_endDate.getMinutes() + period);
		setEndDate(_endDate);
	}, [setEndDate, period, setPageState]);

	/**
	 * Handles requesting permission to notify.
	 */
	const handleNotifyPermission = () => {
		if (!("Notification" in window)) return;

		// Ask user for permission.
		if (Notification.permission !== "denied") {
			Notification.requestPermission();
		}
	};

	/**
	 * Handles bubbling a notification to the client.
	 */
	const handleNotify = useCallback(() => {
		if (!("Notification" in window)) return;

		// Ask user for permission.
		handleNotifyPermission();

		// If not granted still, skip.
		let granted = Notification.permission;
		if (!granted) return;

		const notification = new Notification("Pomo: Timer Up!");
		notification.onclick = () => {
			stopAudio();
		};
	}, []);

	/**
	 * Handles just reseting the timer and page.
	 */
	const handleEndTimer = useCallback(() => {
		// Clear end date.
		setEndDate(undefined);

		// Set view back to selection?
		setPageState("select");
	}, [setEndDate, setPageState]);

	useEffect(() => {
		handleNotifyPermission();
	}, []);

	useEffect(() => {
		if (!endDate) {
			setPageState("select");
		} else if (endDate && ["loading", "select"].includes(pageState)) {
			setPageState("timer");
		}

		/**
		 * Calculates the time remaining in various human readable formats.
		 * @returns {[minutes, seconds, milliseconds]} - The amount of time remaining broken down.
		 */
		const calcTime = () => {
			// Remaining time drawn out to minutes and seconds.
			const msRemaining = new Date(endDate) - new Date();
			let minutes = Math.ceil(msRemaining / 1000 / 60) - 1;
			let seconds = Math.ceil((msRemaining / 1000) % 60) - 1;

			// Return in order.
			return [minutes, seconds, msRemaining];
		};

		// Initial render before heartbeat takes over.
		setCountdown(calcTime());

		const heartbeat = setInterval(() => {
			const calc = calcTime();
			if (calc[2] < 0) {
				clearInterval(heartbeat);
				handleEndTimer();
				handleNotify();
				playAudio("/simple-tone.wav");
				return;
			}
			setCountdown(calc);
		}, 1000);

		return () => clearInterval(heartbeat);
	}, [endDate, pageState, handleEndTimer, handleNotify, setPageState]);

	/**
	 * Decides which UI to render, based on page state.
	 */
	const RenderedComponent = useMemo(() => {
		switch (pageState) {
			case "timer":
				return (
					<Timer countdown={countdown} onCancel={() => handleEndTimer()} />
				);
			default:
				return (
					<Selection
						onStartTimer={handleStartTimer}
						onSelectPeriod={setPeriod}
						period={period}
						onSelectMode={setMode}
						mode={mode}
					/>
				);
		}
	}, [
		pageState,
		countdown,
		period,
		setPeriod,
		mode,
		setMode,
		handleStartTimer,
		handleEndTimer,
	]);

	return (
		<main>
			<div>{RenderedComponent}</div>
			<div
				className={`tomatoBackground ${
					pageState === "select" ? "small" : "full"
				} ${mode === "focus" ? "focus" : "break"}`}
			></div>
			<audio id="audioPlayer" loop={false}></audio>
		</main>
	);
}

/**
 * Handles playing the beeper sound.
 *
 * Has to be here to interact easily with dom and be on window.
 */
function playAudio(songSrc) {
	const audioPlayer = document.getElementById("audioPlayer");

	audioPlayer.src = songSrc;
	audioPlayer.play();
}

/**
 * Handles stopping an resetting the beeper sound.
 */
function stopAudio() {
	const audioPlayer = document.getElementById("audioPlayer");
	audioPlayer.pause();
	audioPlayer.currentTime = 0;
}
