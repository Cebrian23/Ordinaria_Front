import { FunctionalComponent } from "preact/src/index.d.ts";
import { Personaje, Personaje_API } from "../types.tsx";
import { Signal } from "@preact/signals";

const VisorChar: FunctionalComponent<{char: Personaje_API, added: Signal<boolean>}> = (props) => {
    const char = props.char;
    const added = props.added;
    const favs: Personaje[] = [];

    

    const cambiar_cookie = (array: Personaje[]) => {
        document.cookie = `hp_favs=${JSON.stringify(array)}, path=/`;
    }

    return(
        <div>
            <img src={char.image}/>
            <div>
                <span>{char.image}</span>
                <button type="submit"
                onClick={() => {
                    if(added.value === true){}
                    else{}
                }}
                >
                    {
                        added.value === false ?
                        <span>Añadir</span> :
                        <span>Eliminar</span>
                    }
                </button>
            </div>
            <div>
                <span><b>Casa:</b> {char.house}</span>
            </div>
            {
                char.alive === true ?
                <span>Vivo</span> :
                <span>Muerto</span>
            }
            <a href="/">Volver</a>
        </div>
    );
}

export default VisorChar;