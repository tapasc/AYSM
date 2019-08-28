import '@webcomponents/webcomponentsjs';
import '../css/styles.less';
import mainTpl from '../views/test.hbs';
import imgLoader from "./com/rn/assetLoaders/imageLoader";

//@Components
import progressBar from './com/rn/components/loader/progressBar/progressBar';
import labelComponent from './com/rn/components/ui/label/label';


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
        let prog01 = document.querySelector('#p1').setAttribute('data-progress-percent',35);
        let prog02 = document.querySelector('#p2').setAttribute('data-progress-percent',65);
        let prog03 = document.querySelector('#p3').setAttribute('data-progress-percent',100);
        // let myElement = document.createElement('my-component');

      
        let imgLdr = new imgLoader(this.gameData.assets.image);
        // imgLdr.onStartEvent.add({"beh":(pl)=>{
        //     //console.log('loading started...'+pl.totalImages+"::"+pl.loadedImages);
        // },"scope":this});        
        imgLdr.onProgressEvent.add({
            "beh": (payload) => {
                // let pb = document.querySelector('progress-bar');
                // pb.setAttribute('data-progress-percent',payload.percent);                
            }, "scope": this
        });
        imgLdr.onCompleteEvent.add({
            "beh": (payload) => {
            }, "scope": this
        });
        imgLdr.loadImages();
    }

    get gameConfiguration() {
        return this.gameData;
    }
}
