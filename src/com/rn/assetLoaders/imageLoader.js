import Delegate from "../event/Delegate";
import path from 'path';

export default class imageLoader {
    constructor(configuration) {
        //image asset data 
        this.assetPath = configuration.imagePath
        this._imageList = configuration.imagePool

        //Events
        this.onStartEvent = new Delegate();
        this.onProgressEvent = new Delegate();
        this.onCompleteEvent = new Delegate();
        this.onErrorEvent = new Delegate();

        //progress state
        this.state = 'idle';

        // variable list
        this._totalImages = configuration.imagePool.length;
        this._completedImages = 0;

        //function bindings
        //this._onLoad = this._onLoad.bind(this);

    }


    loadImages() {
        if (this.state != 'progress') {
            this.initCachingImages();
        }
    }


    initCachingImages() {
        const imgLst = this._imageList;
        this.state = "start";
        this.onStartEvent.dispatch({ "totalImages": this._totalImages, "loadedImages": this._completedImages });

        imgLst.map((itmObj) => {
            let imgObj = {}
            imgObj = new Image();
            imgObj.src = path.join(__dirname, this.assetPath) + "/" + itmObj;
            imgObj.onload = this._onLoad.bind(this);
        });
    }

    _onLoad(event) {
        this._completedImages++;

        if (parseInt(this._completedImages) < parseInt(this._totalImages)) {
            this.state = "progress";
            let percent = Math.ceil(this._completedImages / this._totalImages) * 100;
            console.log(percent);
            this.onProgressEvent.dispatch({ "totalImages": this._totalImages, "loadedImages": this._completedImages, "percent": percent });
        } else if (parseInt(this._completedImages) === parseInt(this._totalImages)) {
            this.state = "completed";
            this.onCompleteEvent.dispatch({ "totalImages": this._totalImages, "loadedImages": this._completedImages });
        }
    }


    get onStartEvt() {
        return this.onStartEvent;
    }

    get onProgressEvt() {
        return this.onProgressEvent;
    }

    get onCompleteEvt() {
        return this.onCompleteEvent;
    }

    get onErrorEvt() {
        return this.onErrorEvent;
    }



    get _getImageList() {
        return this.imgList;
    }
    set _setImageList(qeue) {
        this._imageList = qeue;
    }
    get _getState() {
        return this.state;
    }
}