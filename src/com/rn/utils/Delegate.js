export default class Delegate {
    constructor() {
        this._registeredEventList = [];
        
        // this.add = this.add.bind(this);        
        // this.remove = this.remove.bind(this);        
        // this.removeAll = this.removeAll.bind(this);        
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
