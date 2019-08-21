import '../css/styles.less';
import mainTpl from '../views/test.hbs';




export default class Application {
    
    constructor(config) {            
        this.data = {
            author: config.default.author,
            game: config.default.gameName,
            buildVer: config.default.buildVer,
            containerID: config.gameData.containerID
        }
        
    }

    renderApplication() {       
        let tpl = mainTpl(this.data);
        document.querySelector("#"+this.data.containerID).innerHTML = tpl;
    }
}
