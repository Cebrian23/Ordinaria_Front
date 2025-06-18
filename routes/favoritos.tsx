import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts"
import VisorFavs from "../islands/VisorFavs.tsx";
import { Personaje } from "../types.tsx";

type MultiArray = {
  favs: Personaje[],
}

export const handler: Handlers = {
    GET: async(req: Request, ctx: FreshContext<unknown, Personaje[]>) => {
        const favorites: Personaje[] = [];

        const cookies = getCookies(req.headers);
        const cookie = cookies.hp_favs;

        if(cookie !== undefined){
            const intermedio: Personaje[] = JSON.parse(cookie);

            intermedio.forEach((i) => {
                favorites.push(i);
            })
        }

        return ctx.render(favorites);
    }
}

const Page = (props: PageProps<Personaje[]>) => {
    const data = props.data;

    return(
        <VisorFavs data={data} favs={data}/>
    );    
}

export default Page;