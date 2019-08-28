import Delegate from '../../../event/Delegate';
// import label from '../../ui/label/label'

// import './progressBar.less';
export default class progressBar extends HTMLElement {
    constructor() {
        super();

        //@Class Name
        this.className = 'progressBar';

        //@ Properties
        this.label = "p-bar";
        this.progressPercent = 0;

        //@ Child elements
        this.progressElement = null;
        this.labelElement = null;
        this.fillBarElement = null;
        //@ Events
        this.onStart = new Delegate();
        this.onProgress = new Delegate();
        this.onComplete = new Delegate();



        //@progress bar style elements
        this.progressBorderColor = "#911329"
        this.fillColor = "#CC5D70";
        this.progressTextColor = "#fff";


        //@other component instances
          this.label = null;  

        this.template =
            `
            <style>
                #GComponent-progressBar {
                    width: 200px;
                    height: 10px;
                    border-radius: 5px;
                    border: 2px solid ${this.progressBorderColor};
                    text-align: center;
                    position: relative;    
                }            
                #GComponent-progressBar-fillBarElement {
                    background: ${this.fillColor};
                    position: absolute;
                    border-radius: 2px;
                }
                    
                #GComponent-progressBar-label {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    width: 100%;
                    font-size: 9px;
                    color:${this.progressTextColor}
                }            
            </style>
            <div id="GComponent-progressBar">
                <div id="GComponent-progressBar-fillBarElement" style="width:0%;height:10px">
                    <label-component id="GComponent-progressBar-label" data-label="Default"></label-component>
                </div>
             </div>`

        this.root = this.attachShadow({ mode: 'open' });
        //this._container = document.createElement('div');
        this.createComponent();

    }
    static get observedAttributes() {
        return ['data-progress-percent'];
    }

    createComponent() {
        this.root.innerHTML = this.template;
        //this._container.innerHTML= this.template;
        //this.appendChild(this._container);
    }
    connectedCallback() {
        this.render();
        this.onStart.dispatch({});

    }
    disconnectedCallback() {

    }

    adoptedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (oldVal !== newVal) {
            this.progressPercent = parseInt(newVal);
            this.render()
        }

    }
    render() {
        let fill = this.root.querySelector("#GComponent-progressBar-fillBarElement");
            fill.style.width = this.progressPercent + "%";
        let labelElm = this.root.querySelector("label-component");
            labelElm.setAttribute('data-label',this.progressPercent);

        if (this.progressPercent < 100) {
            this.onProgress.dispatch({ 'percent': this.progressPercent });
        } else if (this.progressPercent >= 100) {
            this.onComplete.dispatch({ 'percent': this.progressPercent });
        }
    }
    get getPercent() {
        return this.getAttribute('data-progress-percent');
    }
    set setPercent(newVal) {
        this.setAttribute('data-progress-percent', newVal);
        this.render();
    }

}
customElements.define('progress-bar', progressBar);