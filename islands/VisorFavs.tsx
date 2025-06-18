import { Signal } from "@preact/signals";
import { Personaje } from "../types.tsx";
import { FunctionalComponent } from "preact/src/index.d.ts";

const VisorFavs: FunctionalComponent<{data: Personaje[], favs: Personaje[]}> = (props) => {
    const data = props.data;
    const favs = props.favs;

    const crear_cookie = (favs: Personaje[]) => {
        document.cookie = `hp_favs=${JSON.stringify(favs)}; path=/`
    }

    return(
        <div class="cuadrado">
            {
                data.map((d) => (
                    <div class="personaje">
                        <img src={d.character.image} width={200}/>
                        <div>
                            <a class="a1" href={`/character/${d.character.id}`}>{d.character.name}    </a>
                            <button type="submit"
                            onClick={() => {
                                    if(d.added.value === false){
                                        favs.push({
                                            character: d.character,
                                            added: new Signal<boolean>(true),
                                        });
                                        crear_cookie(favs);
                                    }
                                    else{
                                        const aux: Personaje[] = [];

                                        favs.forEach((f) => {
                                            if(f.character.id !== d.character.id){
                                                aux.push({
                                                    character: f.character,
                                                    added: new Signal<boolean>(false),
                                                });
                                            }
                                        })

                                        while(favs.length > 0){
                                            favs.pop();
                                        }

                                        aux.forEach((a) => {
                                            favs.push(a);
                                        });
                                        crear_cookie(favs);
                                    }
                                }}
                            >
                                {
                                    d.added.value === false ? 
                                    <span>Añadir</span> :
                                    <span>Eliminar</span>
                                }
                            </button>
                        </div>
                        
                    </div>
                ))
            }
        </div>
    );
}

export default VisorFavs;