import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function GoogleSignInButton({onMobile}:{onMobile: boolean}) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          /*
          {
            "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxNGMzN2Q2ZTVjNzU2ZThiNzJmZGI1MDA0YzBjYzM1NjMzNzkyNGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDc2Mzg0MjAzMTktYTltZmkybW0zbDJpN2N2NjA4bTlpaDUwMWtxZHJxcnQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDc2Mzg0MjAzMTktYTltZmkybW0zbDJpN2N2NjA4bTlpaDUwMWtxZHJxcnQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTYwNjYyMDk1NjQ1MzQwMDEzNzkiLCJlbWFpbCI6InJleWVzbGVleWhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc0Njk3MjYxNywibmFtZSI6IlJleWVzIExlZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJc01ZVXViQ1kwWnpHUFRHeTVRZEp5NmNrcGdDLWM2cmI4SGNDZzlqU1FqUGN4VFFnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlJleWVzIiwiZmFtaWx5X25hbWUiOiJMZWUiLCJpYXQiOjE3NDY5NzI5MTcsImV4cCI6MTc0Njk3NjUxNywianRpIjoiMDA0Mjc4MWY2YWRmZmI5ZDI2ZDQyOTNhMmQ5MmJkMTEzNGQ0ZTU4YiJ9.UC_mYA9JP02nF9_P3Q5QDDKKvzPIugh5VMZmNS9RCkvvNemBimrvDeRLkc8lLRHWcQctYIoudKYohakzX-F3D-0dcTOXFKcBHLxf0uAKd6vsURjqexvC7suyJilkKHkLxNRLDHPEjlTH5OmPSrrrt0aiEHEESz5o5_dMmmkLqx5FqREd6K83jDclzkehabLfHEP8n7OO3aFKh7AnhtlGhAv--wuJT8eOpu6gdVWl83FUsQJB_nMt6NQIyH9AJY0a0QS18d3MlnUT7P0xFCnY_vJlHQ122RNk7Pw-ZFCg6Nca1ZE7WJYDkpBKklBumEClAbP6s6i8NcZ-X6w6Ic045Q",
            "clientId": "607638420319-a9mfi2mm3l2i7cv608m9ih501kqdrqrt.apps.googleusercontent.com",
            "select_by": "btn_confirm"
          }
          TODO: verify that credentialResponse.clientId === clientId
          post the credentialResponse to /api/auth/login
          on the backend, verify the credential JWT as appropriate 
          if the user exists in db, log them in
          if the user does not exist in db, create a new user
          response returns session token cookie
          set the session token cookie in the browser
          */
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        type={
          onMobile ? 'icon' : 'standard'
        }
        text='continue_with'
        theme='outline'
        useOneTap
        auto_select
        cancel_on_tap_outside
      />
    </GoogleOAuthProvider>
  );
}
