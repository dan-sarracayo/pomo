import { padLeft } from "@/helpers/padLeft";

import styles from "./Selection.module.css";
import MaterialIcon from "./MaterialIcon";

const { useState, useEffect } = require("react");

const Selection = ({
	onSelect = (time) => undefined,
	onModeChange = (mode) => undefined,
	mode: _mode,
}) => {
	const range = [2, 5, 10, 15, 25];
	const [period, setPeriod] = useState(10);
	const [mode, setMode] = useState(_mode);

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
		<div className={styles.selectionView}>
			<div className={styles.tomato}>
				<div className={styles.timeBar}>
					<MaterialIcon
						disabled={period === range[0]}
						onClick={() => handleSelect("minus")}
						icon="chevron_left"
					/>
					<h1>{padLeft(period)}:00</h1>
					<MaterialIcon
						disabled={period === range[range.length - 1]}
						onClick={() => handleSelect("plus")}
						icon="chevron_right"
					/>
				</div>
				<div className={styles.playBar}>
					<MaterialIcon
						disabled={!mode || !period}
						onClick={() => onSelect(period)}
						icon="play_arrow"
					/>
				</div>
			</div>
			<div className={styles.modesBar}>
				<button
					className="primary"
					disabled={mode === "focus"}
					onClick={() => setMode("focus")}
				>
					focus
				</button>
				<button
					className="primary"
					disabled={mode === "break"}
					onClick={() => setMode("break")}
				>
					break
				</button>
			</div>
		</div>
	);
};

export default Selection;
