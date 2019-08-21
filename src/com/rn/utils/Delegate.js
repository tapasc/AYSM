class Delegate {
    constructor() {
        this._registeredEventList = [];        
    }

    add(evtObj) {
        this._registeredEventList.push(evtObj);
    }
    remove(fn) {
        this._registeredEventList = this._registeredEventList.filter((beh) => {
            if (DataTransferItem.beh != fn) {
                return item;
            }
        })
    }

    removeAll() {
        this._registeredEventList = [];
    }

    dispatch(payload) {
        this._registeredEventList.forEach((item) => {
            item.beh.call(item.scope, payload);
        });
    }
}

module.exports = Delegate;