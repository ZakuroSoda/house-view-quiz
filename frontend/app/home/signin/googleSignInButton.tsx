import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function GoogleSignInButton({onMobile}:{onMobile: boolean}) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentialResponse),
          })
            .then(response => {
              if (response.ok) {
                console.log('Login Successful');
                return response.text();
              } else {
                throw new Error('Login Failed');
              }
            }).then(data => {
              console.log('Response:', data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
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
