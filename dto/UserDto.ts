class User {
    private _nombre: string;
    private _password_hash: string;
    private _estado: string;
    private _id_lider: number;


    constructor (
        nombre: string,
        password_hash: string,
        estado: string,
        id_lider: number
    ){
        this._nombre = nombre;
        this._password_hash = password_hash;
        this._estado = estado;
        this._id_lider = id_lider
    }


    //Getters
    get nombre(): string {
      return this._nombre;
    }

    get password_hash(): string {
      return this._password_hash;
    }

    get estado(): string {
      return this._estado;
    }

    get id_lider(): number {
      return this._id_lider;
    }


    //Setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    set password_hash(password_hash: string) {
        this._password_hash = password_hash;
    }

    set estado(estado: string) {
        this._estado = estado;
    }

    set id_lider(id_lider: number) {
        this._id_lider = id_lider;
    }
}

export default User;