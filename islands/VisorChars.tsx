import { FunctionalComponent } from "preact/src/index.d.ts";
import { Personaje } from "../types.tsx";
import { Signal } from "@preact/signals";

type MultiArray = {
  favs: Personaje[],
  chars: Personaje[],
}

const VisorChars: FunctionalComponent<{data: Personaje[], favs: Personaje[]}> = (props) => {
    const data = props.data;
    const favs = props.favs;

    const destino: Personaje[] = [];

    const actualizar = (char: Personaje[], favs: Personaje[]) => {
        char.forEach((c) => {
            const signal = new Signal<boolean>(false)
            favs.forEach((f) => {
                if(c.character.id === f.character.id){
                    destino.push({
                        character: c.character,
                        added: new Signal(true),
                    });
                    signal.value = true;
                }

                if(signal.value === false){
                    destino.push({
                        character: c.character,
                        added: new Signal(false),
                    });
                }
            })
        })
    }

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
                                        actualizar(data, favs);
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
                                        actualizar(data, favs);
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

export default VisorChars;