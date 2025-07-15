class Login{
    private _nombre: string;
    private _password_hash: string;


    constructor(
        nombre: string,
        password_hash: string
    ){
        this._nombre = nombre;
        this._password_hash = password_hash;
    }

    // Getters

    get nombre(): string {
     return this._nombre;
    }

    get password_hash(): string {
     return this._password_hash;
    }

    // Setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    set password_hash(password_hash: string) {
        this._password_hash = password_hash;
    }
}

export default Login;