import Delegate from '../../../event/Delegate';

//@ import other components
 import '../../loader/progressBar/progressBar'

class assetLoaderView extends HTMLElement {

    constructor() {
        super();

        //@ Class Name
        this.name = 'assetLoaderView';

        
        //@ component properties
        this.loadingAssets = null;
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
                <progress-bar data-progress-percent='35'></progress-bar>
            </div>
        `;

        //@ create shadow root
        this.root = this.attachShadow({mode:'open'});
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
    }

    disconnectedCallback() {

    }

    adoptedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name==='data-assets'){
            this.loadingAssets = JSON.stringify(newValue);
        }
    }

    renderComponent() {

    }


}

customElements.define('loader-component',assetLoaderView)