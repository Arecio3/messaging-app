import React from 'react'
import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

function login() {
    // Static Site Generation prepares page on a server cache it and when user requests it its ready to go 
    const signIn = () => {
        // this is how you get cool google sign in functionality
        auth.signInWithPopup(provider).catch(console.error);
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            
            <LoginContainer>
                <Logo src="https://play-lh.googleusercontent.com/OY4rxeNTPaHwyOTZ-RUooqJvPnO5QUYmQcw0dhD90Mu6UWItOSZfQv7ks_FscbBow0M"/>
                <Button onClick={signIn} variant="contained">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default login

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`;

const LoginContainer = styled.div`
padding: 100px;
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
height: 200px;
width: 200px;
border-radius: 50%;
margin-bottom: 50px;
`;

//<StyledButton classes={{ label: 'my-class-name' }}>Sign in with Google</StyledButton>
// const StyledButton = withStyles({
//     root: {
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       borderRadius: 3,
//       border: 0,
//       color: 'white',
//       padding: '0 30px',
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     },
//     label: {
//       textTransform: 'capitalize',
//     },
//   })(Button);