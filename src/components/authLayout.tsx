import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

type LayoutProps = {
  children: React.ReactNode;
}

export default function AuthLayout({children}: LayoutProps) {
  const {isLoading, user, error} = useUser();

  return (
    <>
      {user ? (
        children
      ) : (
        <>
          {error && <p>{error.message}</p>}
          {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
          <button
            onClick={() => {
              supabaseClient.auth.signIn(
                { provider: "discord" },
                { redirectTo: "http://localhost:3000" }
              );
            }}
          >
            Login with github
          </button>
        </>
      )}
    </>
  );
}
