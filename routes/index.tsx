import VisorChars from "../islands/VisorChars.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";
import { Personaje, Personaje_API } from "../types.tsx";
import { getCookies } from "$std/http/cookie.ts"
import { Signal } from "@preact/signals";

type MultiArray = {
  favs: Personaje[],
  chars: Personaje[],
}

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, MultiArray>) => {
    const characters_api = await Axios.get<Personaje_API[]>("https://hp-api.onrender.com/api/characters");
    const data = characters_api.data;

    const characters: Personaje[] = [];
    const favorites: Personaje[] = [];

    const cookies = getCookies(req.headers);
    const cookie = cookies.hp_favs;

    if(cookie !== undefined){
      const intermedio: Personaje[] = JSON.parse(cookie);

      intermedio.forEach((i) => {
        favorites.push(i);
      })
    }

    data.forEach((d) => {
      const signal = new Signal<boolean>(false);

      characters.push({
        character: d,
        added: signal,
      });
    });

    return ctx.render({
      favs: favorites,
      chars: characters,
    });
  }
}

const Page = (props: PageProps<MultiArray>) => {
  const data = props.data.chars;
  const favs = props.data.favs;

  return (
    <div>
      <VisorChars data={data} favs={favs}/>
    </div>
  );
}

export default Page;