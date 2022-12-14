import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextPageWithLayout } from "./_app";
import { ReactElement, useEffect, useState } from "react";
import AuthLayout from "../components/authLayout";
import { useRouter } from "next/router";
import { List } from "../types/supabase";
import NavBar from "../components/navBar";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const {isLoading, user, error} = useUser();
  const [lists, setLists] = useState<undefined | List[]>(undefined);
  const [dataLoading, setDataLoading] = useState(true);

  const loading = isLoading || dataLoading;

  useEffect(() => {
    async function loadData() {
      const {data} = await supabaseClient.from<List>('list').select("*");
      const sortedData = data?.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      setLists(sortedData);
      setDataLoading(false);
    }
    loadData();
  }, []);

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
        <ul className="">
          {lists ? (
            lists.map((list) => (
              <li className="border-b border-black p-4" key={list.id} onClick={() => router.push(`/list/${list.id}`)}>
                {list.name}
              </li>
            ))
          ) : (
            <p>You dont have any lists</p>
          )}
        </ul>
        <p>{error?.message}</p>
      </main>
      <NavBar />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
}

export default Home;
