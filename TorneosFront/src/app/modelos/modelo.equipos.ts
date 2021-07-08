import { NumberFormatStyle } from "@angular/common";

export class Equipos{
  constructor(
    public _id: String,
    public nombre: String,
    public imagen: String,
    public golesFavor: Number,
    public golesContra: Number,
    public puntos: Number,
    public partidos: Number,
    public Liga: String
  ){}
}
