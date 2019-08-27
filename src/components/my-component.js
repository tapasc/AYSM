export default class myComponent extends HTMLElement {
    constructor() {
        super();


        this.name = 'Blank';
        this.root = this.attachShadow({ mode: 'open' });        
        this.createCompoenent();
        console.log('constructed!');
    }
    static get observedAttributes() {
        return ['data-name'];
    }

    createCompoenent() {
        let customElement = document.createElement('div');
        let textNode = document.createTextNode(`Hello ${this.name}`);            
        customElement.appendChild(textNode);
        customElement.setAttribute("id","labelNode");
        this.root.appendChild(customElement);
    }
    connectedCallback() {
        this.render();
        console.log('connected!');
    }
    disconnectedCallback() {
        console.log('disconnected!');
    }

    adoptedCallback() {
        console.log('adopted!');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(`Attribute: ${name} changed!`);

        if (oldVal !== newVal) {
            this.name = newVal;
            this.render()
        }

    }
    get getName() {
        this.name = this.getAttribute('data-name');
    }
    set setName(newVal) {
        this.name = newVal;
        this.render();
    }
    render() {
        this.root.innerHTML = `Hello ${this.name}`;
    }
}
customElements.define('my-component', myComponent);