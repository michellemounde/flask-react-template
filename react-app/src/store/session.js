// constants
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = user => {
	return {
		type: SET_USER,
		payload: user
	}
};

const removeUser = () => {
	return {
		type: REMOVE_USER
	}
};


export const signup = ({
	firstName,
	lastName,
	username,
	email,
	password
}) => async (dispatch) => {
	const res = await fetch("/api/sessions/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name: firstName,
			last_name: lastName,
			username,
			email,
			password
		}),
	});

	if (res.ok) {
		const data = await res.json();
		if (data.user) dispatch(setUser(data.user));
		return res;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			const err = new Error("Error with signup details")
			err.errors = data.errors
			err.name = "SignupError"
			throw err
		}
	} else {
		const err = new Error("An error occurred. Please try again.")
		err.name = "ServerError"
		throw err
	}
};


export const login = ({credential, password}) => async (dispatch) => {
	const res = await fetch("/api/sessions/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			credential,
			password,
		}),
	})

	if (res.ok) {
		const data = await res.json();
		if (data.user) dispatch(setUser(data.user));
		return res;
	} else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			const err = new Error("Error with login details")
			err.errors = data.errors
			err.name = "LoginError"
			throw err
		}
	} else {
		const err = new Error("An error occurred. Please try again.")
		err.name = "ServerError"
		throw err
	}
};


export const logout = () => async (dispatch) => {
	const res = await fetch("/api/sessions", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		dispatch(removeUser());
		return res;
	}
};



export const restoreUser = () => async (dispatch) => {
	const res = await fetch("/api/sessions/", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const data = await res.json();
		if (data.user) dispatch(setUser(data.user));
	}
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let nextState = Object.assign({}, state);

	switch (action.type) {
		case SET_USER:
			nextState.user = action.payload;
			return nextState;
		case REMOVE_USER:
			nextState.user = null;
			return nextState;
		default:
			return state;
	}
}

export default sessionReducer;
