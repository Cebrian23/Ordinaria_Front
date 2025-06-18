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

    return(
        <div class="cuadrado">
            {
                actualizar(data, favs)
            }
            {
                data.map((d) => (
                    <div class="personaje">
                        <img src={d.character.image} width={200}/>
                        <div>
                            <a class="a1" href={`/character/${d.character.id}`}>{d.character.name}    </a>
                            <button type="submit">
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