import './progressBar.less';

export default class progressBar {
    constructor(Element) {
        this.label = "progress-bar";
        this.progressElement = null;
        this.labelElement = null;
        this.fillBarElement = null;

        this.parentElement = Element;
        this.progressPercent = 0;
    }
    createInstance() {
        this.createElement().render();
        return this;
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
        this.labelElement.setAttribute("id","labelElement");
        this.labelElement.innerHTML = this.label;

        this.progressElement.appendChild(this.fillBarElement);
        this.progressElement.appendChild(this.labelElement);
        return this;
    }
    render() {
        this.parentElement.appendChild(this.progressElement);
    }

    update() {
        let fill = this.parentElement.querySelector("#fillBarElement");
            fill.style.width = this.progressPercent + "%";
        let labelElm = this.parentElement.querySelector("#labelElement");
            labelElm.innerHTML = this.label;

    }

    set setProgress(percent) {
        this.progressPercent = percent;
        this.update();
    }
    set setLabel(labelText) {
        this.label = labelText;
    }
    get getProgress() {
        return this.progressPercent;
    }


}