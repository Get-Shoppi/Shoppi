import "../styles/globals.css";
import { ReactElement, ReactNode } from "react";
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import {UserProvider} from "@supabase/auth-helpers-react";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserProvider supabaseClient={supabaseClient}>
      {getLayout(<Component {...pageProps} />)}
    </UserProvider>
  );
  
}


export default MyApp;
