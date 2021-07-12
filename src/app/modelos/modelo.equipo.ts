export class Equipo{
    constructor(
      public _id: String,
      public nombre: String,
      public imagen: String,
      public golesFavor: Number,
      public golesContra: Number,
      public golesDiferencia:Number,
      public puntos: Number,
      public partidos: Number,
      public Liga: String,
    ){}
  }