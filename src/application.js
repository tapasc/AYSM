import '../css/styles.less';
import mainTpl from '../views/test.hbs';
import imgLoader from "./com/rn/assetLoaders/imageLoader";
import progressBar from "./com/rn/components/loader/progressBar/progressBar"
import '@webcomponents/webcomponentsjs';
import myComponent from './components/my-component';


export default class Application {

    constructor(config) {
        this.gameData = config.gameData;

        this.data = {
            author: config.default.author,
            game: config.default.gameName,
            buildVer: config.default.buildVer,
            containerID: config.gameData.containerID
        }

        this.renderApplication = this.renderApplication.bind(this);

    }

    renderApplication() {
        let tpl = mainTpl(this.data);
        document.querySelector("#" + this.data.containerID).innerHTML = tpl;


        let elem = document.querySelector('.container');
        // let myElement = document.createElement('my-component');

        let progressB = new progressBar(elem);   
            progressB.onDomInjected.add({"beh":(pl)=>{
                console.log('progress bar injected inside root Node');
            },"scope":this});            
            progressB.createElement().render();
            // elem.appendChild(myElement);


        let imgLdr = new imgLoader(this.gameData.assets.image);        
        // imgLdr.onStartEvent.add({"beh":(pl)=>{
        //     //console.log('loading started...'+pl.totalImages+"::"+pl.loadedImages);
        // },"scope":this});        
        imgLdr.onProgressEvent.add({"beh":(payload)=>{            
            progressB.setProgress = payload.percent;
            progressB.setLabel = payload.percent+"%";
            let label = document.querySelector('my-component');
                label.setAttribute("data-name",payload.percent);
        },"scope":this});        
        imgLdr.onCompleteEvent.add({"beh":(payload)=>{            
        },"scope":this});
        imgLdr.loadImages();
    }

    get gameConfiguration() {
        return this.gameData;
    }
}
