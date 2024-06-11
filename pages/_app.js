import Login from "@/components/Login";
import Sidebar from "@/components/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Components, pageProps }) {
  // return <Component {...pageProps} />;

  return (
    <ChakraProvider>
      <Sidebar />
    </ChakraProvider>
  );
}
