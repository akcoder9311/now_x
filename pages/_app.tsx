import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import LoginModel from "@/components/models/LoginModel";
import RegisterModel from "@/components/models/RegisterModel";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import EditModel from "@/components/models/EditModel";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModel />
      <RegisterModel />
      <LoginModel />

      {/* <Modal actionLabel="submit" isOpen title="text model" /> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
