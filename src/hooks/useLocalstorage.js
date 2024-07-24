const { useState, useEffect, useCallback } = require("react");

const useLocalstorage = (
	// Key used by localstorage.
	key = "",
	// Initial value just like useState.
	defaultValue = undefined
) => {
	const [_state, _setState] = useState(defaultValue);

	useEffect(() => {
		const oldValue = window.localStorage.getItem(key);
		if (oldValue) {
			_setState(JSON.parse(oldValue).value);
		}
	}, [key]);

	const setState = useCallback(
		(newValue) => {
			if (!newValue) {
				window.localStorage.removeItem(key);
			} else {
				window.localStorage.setItem(key, JSON.stringify({ value: newValue }));
			}
			_setState(newValue);
		},
		[key, _setState]
	);

	return [_state, setState];
};

export default useLocalstorage;
