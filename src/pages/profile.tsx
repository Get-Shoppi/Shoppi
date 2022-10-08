import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextPageWithLayout } from "./_app";
import { ReactElement, useEffect, useState } from "react";
import AuthLayout from "../components/authLayout";
import { useRouter } from "next/router";
import NavBar from "../components/navBar";

const Home: NextPageWithLayout = () => {
  const {isLoading, user, error} = useUser();

  const loading = isLoading;

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Shoppi</title>
        <meta name="description" content="Shopping list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center py-2 shadow-lg">
        <h1 className="text-xl font-bold text-pink-800">Shoppi</h1>
      </div>
      <main className="container p-4">
        {
          //TODO: create profile page
        }
      </main>
      <NavBar />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
}

export default Home;
