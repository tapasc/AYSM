import Application from "./src/application.js"
import configuration from "./config/settings.js"


class Boot extends Application{
    constructor(){
        super(configuration);
    }    
}

const bootLoader = new Boot();
      bootLoader.renderApplication();