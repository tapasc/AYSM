import Delegate from "../utils/Delegate";

class imageLoader {
    constructor(imageSet) {
        //events
        this.onStart = new Delegate();
        this.onLoad = new Delegate();
        this.onProgress = new Delegate();
        this.onCompleted = new Delegate();
        this.onError = new Delegate();
        this.state = 'idle';
        
        // varriable list
        let _imageList = [];
        let _completionList = [];
    }


    loadImages(imgList) {
        if (imgList instanceof Array) {
            _imageList = imgList;
        } else {
            console.log(new Error("List type does not match.."))
        }

        this.onLoad.add({ "beh": this._onLoad, scope: this });
        this.onProgress.add({ "beh": this._onProgress, scope: this });
        this.onCompleted.add({ "beh": this._onCompleted, scope: this });
        this.onError.add({ "beh": this._onError, scope: this });
        this.onStart.dispatch({});

        this.initCachingImages();
    }


    initCachingImages() {
        let imgLst = this._imageList;
        imgLst.map(function (itmObj) {
            let imgObj = {}
            imgObj = new Image();
            imgObj.src = itmObj;
            imgObj.onload = _handleImageLoad;
        })
    }

    _handleImageLoad(imgRef) {
        this._completionList.push(imgRef);
        this.state = "loaded";
        this.onLoad.dispatch({});
    }

    _onLoad(objRef) {
        if (this._imageList.length < this._completionList.length) {
            this.state = "progress";
            this.onProgress.dispatch({});
        } else if (this._imageList.length === this._completionList.length) {
            this.state = "completed";
            this.onCompleted.dispatch({})
        }
    }

    get _imageList() {
        return this.imgList;
    }
}

// var imageLoader = (function (dom) {

//     var dom = dom;
//     var imageList = [];
//     var imageTagList = [];
//     var callbackFunction = null;
//     var completionArray = [];

//     function initializeData(imgSet, callback) {
//         _setImageList(imgSet);
//         _setCallbackFunction(callback);
//         _initCache();
//     }

//     function _setImageList(imgSet) {

//         if (imgSet instanceof Array) {
//             imageList = imgSet;
//         } else {
//             console.warn("imageType should be an typeof [Array]..");
//         }

//     }

//     function _initCache() {

//         var imgList = getImageList();

//         for (var i = 0; i < imageList.length; i++) {
//             var Obj = {}
//             Obj = new Image();
//             Obj.src = imgList[i];
//             Obj.onload = _markImageCompletion;

//         }
//     }

//     function _markImageCompletion(img) {

//         completionArray.push(img);
//         imageTagList.push(img.path[0])
//         _checkCompletion(completionArray.length);        
//     }

//     function _checkCompletion(compLength) {

//         var imgList = getImageList();

//         if (imgList.length == compLength) {
//             callbackFunction();
//         }
//     }

//     function _setCallbackFunction(callback) {

//         if (callback instanceof Function) {
//             callbackFunction = callback;
//         } else {
//             console.warn("callback should be an typeof [Function]..");
//         }

//     }

//     function getImageList() {
//         return imageList;
//     }

//     function getImageTagList() {
//         return imageTagList
//     }

//     return {
//         initialize: initializeData,
//         getImageList: getImageList,
//         getImageTagList: getImageTagList
//     }

// })(window)