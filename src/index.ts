type Listener = (...args: any[]) => any;

export default class YNEvents {
    private _listeners: Record<
        string,
        {
            on: Listener[];
            once: Listener[];
        }
    > = {};

    on(event: string, listener: Listener): this {
        const listeners = this._listeners[event] ?? { on: [], once: [] };
        listeners.on.push(listener);
        this._listeners[event] = listeners;
        return this;
    }

    once(event: string, listener: Listener) {
        const listeners = this._listeners[event] ?? { on: [], once: [] };
        listeners.once.push(listener);
        this._listeners[event] = listeners;
        return this;
    }

    off(event: string, listener?: Listener): this {
        if (listener == null) {
            delete this._listeners[event];
        } else {
            const listeners = this._listeners[event];
            if (listeners == null) {
                return this;
            }
            let idx = listeners.on.indexOf(listener);
            if (idx >= -1) {
                listeners.on.splice(idx, 1);
            }
            idx = listeners.once.indexOf(listener);
            if (idx >= -1) {
                listeners.once.splice(idx, 1);
            }
        }
        return this;
    }

    emit(event: string, ...args: any[]): void {
        const listeners = this._listeners[event];
        if (listeners == null) return;
        const { on, once } = listeners;
        listeners.once = [];
        for (const listener of [...on, ...once]) {
            listener(...args);
        }
    }
}
