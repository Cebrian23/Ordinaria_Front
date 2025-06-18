import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";
import { Personaje, Personaje_API } from "../../types.tsx";
import { getCookies } from "$std/http/cookie.ts"
import { Signal } from "@preact/signals";
import VisorChar from "../../islands/VisorChar.tsx";

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, Personaje>) => {
        try{
            const id:string = ctx.params.id;

            const characters_api= await Axios.get<Personaje_API[]>(`https://hp-api.onrender.com/api/characters/`+id);
            const data = characters_api.data[0];

            const cookies = getCookies(req.headers);
            const cookie: Personaje[] = JSON.parse(cookies.hp_favs);

            const signal = new Signal(false);

            cookie.forEach((c) => {
                if(c.character.id === data.id){
                    signal.value = true;
                }
            })

            const character: Personaje = {
                character: {
                    id: data.id,
                    name: data.name,
                    image: data.image,
                    house: data.house,
                    alive: data.alive,
                },
                added: signal,
            }

            return ctx.render(character);
        }
        catch(e){
            throw new Error("Ha habido un problema");
        }
    }
}


const Page = (props: PageProps<Personaje>) => {
    return(
        <VisorChar char={props.data.character} added={props.data.added}/>
    );
}

export default Page;