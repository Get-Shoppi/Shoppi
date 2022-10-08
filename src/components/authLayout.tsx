import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { env } from "../env/client.mjs";

type LayoutProps = {
  children: React.ReactNode;
}

export default function AuthLayout({children}: LayoutProps) {
  const {isLoading, user, error} = useUser();
  const redirectURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : env.NEXT_PUBLIC_REDIRECT_URL;

  if (user) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <>
      {redirectURL ? (
        <>
          {error && <p>{error.message}</p>}
          {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
          <button
            onClick={() => {
              supabaseClient.auth.signIn(
                { provider: "discord" },
                { redirectTo: redirectURL }
              );
            }}
          >
            Login with Discord
          </button>
        </>
      ) : (
        <h1 className="text-red-400 font-2xl">NEXT_PUBLIC_REDIRECT_URL is not set.</h1>
      )}
    </>
  );
}
