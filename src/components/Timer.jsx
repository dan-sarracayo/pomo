import { padLeft } from "@/helpers/padLeft";

import style from "./Timer.module.css";
import MaterialIcon from "./MaterialIcon";

const Timer = ({ countdown, onCancel = () => undefined }) => {
	return (
		<div className={style.timerView}>
			<div className={style.countdown}>
				<h1>
					{padLeft(countdown[0])}:{padLeft(countdown[1])}
				</h1>
			</div>
			<div className={style.stopBar}>
				<MaterialIcon onClick={() => onCancel()} icon="stop" />
			</div>
		</div>
	);
};

export default Timer;
