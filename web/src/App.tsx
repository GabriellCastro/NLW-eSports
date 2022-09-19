import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import "./styles/main.css";

import LogoNLW from "./assets/logo.svg";
import CreateAdModal from "./components/CreatAdModal";
import CreateAdBanner from "./components/CreateAdBanner";
import GameBanner from "./components/GameBanner";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const futchGames = async () => {
      const response = await fetch("http://localhost:3001/games");
      const data = await response.json();

      setGames(data);
    };

    futchGames();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={LogoNLW} alt="Logo NLW" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-gradient bg-clip-text">duo</span>{" "}
        está aqui.
      </h1>

      {/* list jogos   */}
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(({ bannerUrl, id, title, _count: { ads } }) => (
          <GameBanner
            key={id}
            bannerUrl={bannerUrl}
            title={title}
            adsCount={ads}
          />
        ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ fontSize: "1rem" }}
      />

      {/* add anúncios */}
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
