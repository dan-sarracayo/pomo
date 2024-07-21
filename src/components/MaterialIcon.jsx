import styles from "./MaterialIcon.module.css";

const MaterialIcon = ({
	icon = "",
	disabled = false,
	onClick = () => undefined,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={styles.materialIconButton}
		>
			<span class="material-symbols-outlined">{icon}</span>
		</button>
	);
};

export default MaterialIcon;
