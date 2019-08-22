import '../css/styles.less';
import mainTpl from '../views/test.hbs';
import imgLoader from "./com/rn/utils/imageLoader";
import progressBar from "./com/rn/ui/progressBar/progressBar"



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
        let progressB = new progressBar(elem).createInstance();
            


        let imgLdr = new imgLoader(this.gameData.assets.image);        
        imgLdr.onStartEvent.add({"beh":(pl)=>{
            //console.log('loading started...'+pl.totalImages+"::"+pl.loadedImages);
        },"scope":this});        
        imgLdr.onProgressEvent.add({"beh":(pl)=>{
            //console.log('loading in progress...'+pl.percent);
            progressB.setProgress = pl.percent;
            progressB.setLabel = pl.percent+"%";
        },"scope":this});        
        imgLdr.onCompleteEvent.add({"beh":(pl)=>{
            //console.log('loading completed...'+pl.totalImages+"::"+pl.loadedImages);
        },"scope":this});
        imgLdr.loadImages();              



    }

    get gameConfiguration() {
        return this.gameData;
    }
}
