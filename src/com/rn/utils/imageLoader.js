class imageLoader {
    constructor(image){

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