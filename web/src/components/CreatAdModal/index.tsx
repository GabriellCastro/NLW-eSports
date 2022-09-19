import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { toast } from "react-toastify";

import axios from "axios";

import { Check, GameController } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";

import { Input } from "../Form/Input";

interface Game {
  id: string;
  title: string;
}

function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3001/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.game) {
      toast("Preencha todos os campos");
      return;
    }

    try {
      await axios.post(`http://localhost:3001/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      toast("Anúncio criado com sucesso!");
    } catch (error) {
      toast(error + " -- Erro ao criar anúncio");
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/55">
        <Dialog.Title className="text-3xl text-white font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-6 flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              name="game"
              id="game"
              className="rounded bg-zinc-900 text-sm py-2 px-4 focus:outline-none focus:border-violet-500"
            >
              <option disabled selected value="">
                Selecione o game que deseja jogar
              </option>
              {games.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Ex: XernoBILL"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                name="yearsPlaying"
                id="yearsPlaying"
                placeholder="Ex: 5"
              />
            </div>

            <div className=" flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                type="text"
                name="discord"
                id="discord"
                placeholder="Ex: XernoBILL#1234"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Segunda"
                  className={`w-8 h-8 bg-zinc-900 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Terça"
                  className={`w-8 h-8 bg-zinc-900 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : ""
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Quarta"
                  className={`w-8 h-8 bg-zinc-900 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : ""
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quinta"
                  className={`w-8 h-8 bg-zinc-900 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : ""
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Sexta"
                  className={`w-8 h-8 bg-zinc-900 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sábado"
                  className={`w-8 h-8 bg-zinc-900 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Domingo"
                  className={`w-8 h-8 bg-zinc-900 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : ""
                  }`}
                >
                  D
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hourStart"
                  id="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  name="hourEnd"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 rounded bg-zinc-900"
            >
              <Checkbox.Indicator className="w-4 h-4 bg-zinc-900 rounded-md">
                <Check size={24} className="text-violet-600" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-center gap-6">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 text-white font-semibold px-5 h-12 rounded-md mt-4 hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>

            <button
              type="submit"
              className="bg-violet-500 text-white font-bold px-5 rounded-lg mt-4 flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CreateAdModal;
