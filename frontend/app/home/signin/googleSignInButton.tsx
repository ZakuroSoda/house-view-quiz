import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function GoogleSignInButton({onMobile}:{onMobile: boolean}) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          /*
          TODO: 
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
