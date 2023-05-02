import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../store/session";
import { useModal } from "../../context/Modal";

import "./LoginForm.css";

const LoginFormModal = () => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      credential,
      password
    }

    return dispatch(login(payload))
      .then(closeModal)
      .catch(async (err) => setErrors(err.errors))
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.server && <p>{errors.server}</p>}
        {errors.credential && <p>{errors.credential}</p>}
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        {errors.password && <p>{errors.password}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
