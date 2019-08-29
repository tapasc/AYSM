import Delegate from '../../../event/Delegate';

// import './progressBar.less';
export default class label extends HTMLElement {
    constructor() {
        super();

        //@Class Name
        this.className = 'label-component';

        //@ Properties
        this.label = "label-bar";


        //@ Child elements
        this.labelElement = null;

        //@ Events
        this.onCreate = new Delegate();



        //@progress bar style elements
        this.labelColor = "#e2eb34"


        //@styles passed through parameter
        //TBD

        
        //@ internal template styles
        this.template =
            `
            <style>
            #GComponent-label-text{
                color:${this.labelColor}
            }
            </style>
            <div id="GComponent-label">                
                <div id="GComponent-label-text">${this.label}</div>                
            </div>`
        
        //@ create the shado root for the element    
        this.root = this.attachShadow({ mode: 'open' });
        //this._container = document.createElement('div');
        this.createComponent();

    }

    static get observedAttributes() {
        return ['data-label'];
    }

    createComponent() {
        this.root.innerHTML = this.template;
        //this._container.innerHTML = this.template;
        //this.appendChild(this._container);
    }
    connectedCallback() {
        this.render();
        this.onCreate.dispatch({});
    }
    disconnectedCallback() {

    }

    adoptedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {       
        if (oldVal !== newVal) {
            this.label = newVal;
            this.render()
        }

    }

    render() {       
        let labelTextElement = this.root.querySelector("#GComponent-label-text");
        labelTextElement.innerHTML = this.label;
    }
    get getLabel() {
        return this.getAttribute('data-label');
    }
    set setLabel(newVal) {
        this.setAttribute('data-label', newVal);
        this.render();
    }

}
customElements.define('label-component', label);