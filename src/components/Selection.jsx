import { padLeft } from "@/helpers/padLeft";

import styles from "./Selection.module.css";
import MaterialIcon from "./MaterialIcon";

const Selection = ({
	period,
	onSelectPeriod = (time) => undefined,
	mode,
	onSelectMode = (mode) => undefined,
	onStartTimer = () => undefined,
}) => {
	const range = [2, 5, 10, 15, 25];

	const handleSelect = (dir) => {
		const indexOfCurrent = range.indexOf(period);
		onSelectPeriod(
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
						onClick={() => onStartTimer(period)}
						icon="play_arrow"
					/>
				</div>
			</div>
			<div className={styles.modesBar}>
				<button
					className="primary"
					disabled={mode === "focus"}
					onClick={() => onSelectMode("focus")}
				>
					focus
				</button>
				<button
					className="primary"
					disabled={mode === "break"}
					onClick={() => onSelectMode("break")}
				>
					break
				</button>
			</div>
		</div>
	);
};

export default Selection;
