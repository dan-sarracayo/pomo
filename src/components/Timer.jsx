import { padLeft } from "@/helpers/padLeft";

const Timer = ({ countdown, mode, onCancel = () => undefined }) => {
	return (
		<div className="timer-wrapper">
			{mode}
			<div className="countdown">
				{padLeft(countdown[0])}:{padLeft(countdown[1])}
			</div>
			<div className="stop-wrapper">
				<button onClick={() => onCancel()}>stop</button>
			</div>
		</div>
	);
};

export default Timer;
