import Head from "next/head";
import { ReactElement, useState } from "react";
import AuthLayout from "../../components/authLayout";
import { NextPageWithLayout } from "../_app";
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { List } from "../../types/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import BackIcon from "../../icons/back";
import { useRouter } from "next/router";
import NavBar from "../../components/navBar";

const NewList: NextPageWithLayout = () => {
  const router = useRouter();
  const {isLoading, user} = useUser();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const loading = isLoading;

  async function createNewList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    if (!name) {
      setError("Please enter a name");
      setSubmitting(false);
      return;
    }
    if (name.length < 3) {
      setError("Name must be at least 3 characters");
      setSubmitting(false);
      return;
    }
    const res = await supabaseClient
      .from<List>("list")
      .insert({ name, user_id: user?.id });

    setSubmitting(false);
    if (res.error) {
      setError(res.error.message);
    } else {
      router.back();
    }
  }

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Shoppi - New list</title>
        <meta
          name="description"
          content="Create a new Shopping list using Shoppi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-between py-2 shadow-lg">
        <div
          className="flex items-center gap-1 px-1"
          onClick={() => router.back()}
        >
          <BackIcon />
          <p>Back</p>
        </div>
        <h1 className="text-xl font-bold text-pink-800">Shoppi - New List</h1>
        <div className="invisible flex items-center gap-1 px-1">
          <BackIcon />
          <p>Back</p>
        </div>
      </div>
      <main className="p-4">
        <form onSubmit={createNewList} className="flex flex-col">
          <label htmlFor="list-name">List name</label>
          <input
            type="text"
            id="list-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border ${
              error ? "border-red-500" : "border-gray-500"
            } rounded-lg py-1 px-2`}
          />
          <p className="text-sm text-red-500">{error}</p>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-max self-end rounded-lg border border-gray-500 px-2 py-1"
          >
            Create list
          </button>
        </form>
      </main>
      <NavBar />
    </div>
  );
}

NewList.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
}

export default NewList;
