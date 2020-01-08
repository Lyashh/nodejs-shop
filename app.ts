class App {
    protected  static _app: App
    private constructor() {
    }

    public static getInstance() {
        return this._app || (this._app = new this());
    }
}


