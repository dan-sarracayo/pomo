import { padLeft } from "@/helpers/padLeft";

const { useState, useEffect } = require("react");

const Selection = ({
	onSelect = (time) => undefined,
	onModeChange = (mode) => undefined,
}) => {
	const range = [2, 5, 10, 15, 25];
	const [period, setPeriod] = useState(10);
	const [mode, setMode] = useState("focus");

	useEffect(() => {
		onModeChange(mode);
	}, [mode, onModeChange]);

	const handleSelect = (dir) => {
		const indexOfCurrent = range.indexOf(period);
		setPeriod(
			dir === "minus" ? range[indexOfCurrent - 1] : range[indexOfCurrent + 1]
		);
	};

	return (
		<div>
			<div className="tomato">
				<div className="time-bar">
					<button
						disabled={period === range[0]}
						onClick={() => handleSelect("minus")}
					>
						minus
					</button>
					<h4>{padLeft(period)}:00</h4>
					<button
						disabled={period === range[range.length - 1]}
						onClick={() => handleSelect("plus")}
					>
						plus
					</button>
				</div>
				<div className="play-button-wrapper">
					<button disabled={!mode || !period} onClick={() => onSelect(period)}>
						start
					</button>
				</div>
			</div>
			<div className="modes">
				<button disabled={mode === "focus"} onClick={() => setMode("focus")}>
					focus
				</button>
				<button disabled={mode === "break"} onClick={() => setMode("break")}>
					break
				</button>
			</div>
		</div>
	);
};

export default Selection;
