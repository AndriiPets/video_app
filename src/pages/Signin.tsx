import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFaliure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgSide};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div``;

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signin/",
        {
          name,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFaliure());
    }
  };

  const signinWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("http://localhost:8000/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
          })
          .then((res) => dispatch(loginSuccess(res.data)));
      })
      .catch((err) => {
        dispatch(loginFaliure(err));
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to AstroTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={(e) => login(e)}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={() => signinWithGoogle()}>Signin With Google</Button>
        <Title>or</Title>
        <SubTitle>Register</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign up</Button>
      </Wrapper>
    </Container>
  );
}

export default Signin;
