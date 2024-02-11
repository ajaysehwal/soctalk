import Main from "./components/main";
import { SocketProvider } from "./context";
export default function Home() {

  return  <SocketProvider> <Main /> </SocketProvider>;
}
