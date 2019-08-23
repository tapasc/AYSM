import '../progressBar/progressBar.less';
import Delegate from "../../../event/Delegate"

export default class progressBar {
    constructor(Element) {
        //@class Name
        this.className = 'progressBar';

        //@ Element to be inserted into
        this.parentNode = Element;

        //@ Element properties
        this.label = "progress-bar";
        this.progressPercent = 0;

        //@ Child elements
        this.progressElement = null;
        this.labelElement = null;
        this.fillBarElement = null;

        //@ Events
        this.onCreateElement = new Delegate();
        this.onDomInjected = new Delegate();
    }

    createElement() {
        this.progressElement = document.createElement('div');
        this.progressElement.setAttribute("id", "progress");
        this.progressElement.classList.add("progressBar");


        this.fillBarElement = document.createElement('div');
        this.fillBarElement.setAttribute("id", "fillBarElement");
        this.fillBarElement.style.width = "0px;";
        this.fillBarElement.style.height = "100%";
        this.fillBarElement.classList.add("fillBar");

        this.labelElement = document.createElement('span');
        this.labelElement.setAttribute("id", "labelElement");
        this.labelElement.innerHTML = this.label;

        this.progressElement.appendChild(this.fillBarElement);
        this.progressElement.appendChild(this.labelElement);
        return this;
    }

    render() {
        let element = this.parentNode.appendChild(this.progressElement);

        if (element instanceof HTMLElement) {
            this.onDomInjected.dispatch();            
            return this;
        } else {
            throw new Error(`Element ${this.className} could not be created`);
        }


    }

    update() {
        let fill = this.parentNode.querySelector("#fillBarElement");
        fill.style.width = this.progressPercent + "%";
        let labelElm = this.parentNode.querySelector("#labelElement");
        labelElm.innerHTML = this.label;
    }

    set setProgress(percent) {
        this.progressPercent = percent;
        this.update();
    }

    get getProgress() {
        return this.progressPercent;
    }


}