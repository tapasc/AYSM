import Delegate from '../../../event/Delegate';
import {get} from 'axios';
import assets from '../../../../../../config/gameData';
import imgLoader from '../../../assetLoaders/imageLoader';
import imageLoader from '../../../assetLoaders/imageLoader';

//@ import other components if required


class assetLoaderView extends HTMLElement {

    constructor() {
        super();

        //@ Class Name
        this.name = 'assetLoaderView';

        //@imageLoader instance
        this.imgLoaderInstance = null;

        //@ component properties
        this.loadingAssets = null;        
        this.assetsList = assets;
        this.template = `
            <style>
            #component-assetLoaderView{
                width:100%;
                height:630px;
                background:url(./assets/images/Image03.jpg) no-repeat 0 0;
            }
            progress-bar{
                position:relative;
                top:310px;
                left:405px;
            }            
            </style>
            <div id="component-assetLoaderView">
                <progress-bar data-progress-percent='0'></progress-bar>
            </div>
        `;

        //@ create shadow root
        this.root = this.attachShadow({ mode: 'open' });
        this.createComponent();
    }


    static get observedAttributes() {
        return ['data-assets']
    }

    createComponent() {
        this.root.innerHTML = this.template;
    }

    connectedCallback() {
        this.renderComponent();
        this.assignAssetLoadingEvents();
    }

    disconnectedCallback() {

    }

    adoptedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-assets') {
            this.loadingAssets = JSON.stringify(newValue);
        }
    }

    renderComponent() {

    }

    assignAssetLoadingEvents(){
       // console.log(this.assetsList.assets.image);
        this.imgLoaderInstance = new imageLoader(this.assetsList.assets.image)
        this.imgLoaderInstance.onProgressEvt.add({"beh":this._handleProgress,"scope":this});
        this.imgLoaderInstance.onCompleteEvt.add({"beh":this._handleProgressComplete,"scope":this});
    }

    _handleProgress(payload){
        console.log('--'+payload);
    }

    _handleProgressComplete(payload){
        console.log('complete--'+payload);
    }

}

customElements.define('loader-component', assetLoaderView)