import { padLeft } from "@/helpers/padLeft";

import style from "./Timer.module.css";

const Timer = ({ countdown, mode, onCancel = () => undefined }) => {
	return (
		<div className={style.timerView}>
			<div className={style.countdown}>
				<h1>
					{padLeft(countdown[0])}:{padLeft(countdown[1])}
				</h1>
			</div>
			<div className={style.stopBar}>
				<button onClick={() => onCancel()}>stop</button>
			</div>
		</div>
	);
};

export default Timer;
