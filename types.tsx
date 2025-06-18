import { Signal } from "@preact/signals";

export type Personaje_API = {
    id: string,
    name: string,
    image: string,
    house: string,
    alive: boolean,
}

export type Personaje = {
    character: Personaje_API,
    added: Signal<boolean>,
}