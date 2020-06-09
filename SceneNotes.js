class SceneNotes extends Application {
    super(options){
    }

    create(){
        let opt=Dialog.defaultOptions;
        opt.resizable=true;
        opt.title="Scene Notes";
        opt.width=600;
        opt.height=300;
        opt.minimizable=true;
        var sn = new SceneNotes(opt).render(true);
        game.socket.on("module.SceneNotes", data => {
            sn.render(false);
            //console.log("Socket received");
        })
    }

    activateListeners(html) {
        super.activateListeners(html);
        const myButton = html.find("button[name='save']");
        myButton.on("click", event => this._onClickButton(event, html));
      }   
      async _onClickButton(event, html) {
            var t = document.getElementById("sceneNotes")
            var text = t.value;
            await game.scenes.viewed.setFlag("world","sceneNotes",text);
            ui.notifications.info("Scene Notes saved.")
            await game.socket.emit("module.SceneNotes",{"Saved":true});
      }

    getData(){
        var notes = game.scenes.viewed.getFlag("world","sceneNotes");
        var canEdit = "disabled";
        if(game.user.isGM){
            canEdit ="";
        }
        if (notes == undefined) {
            notes = ""
        }
        var content = `<textarea id="sceneNotes" style="background:white; color: black; font-family:Verdana;" rows="12" ${canEdit}>${notes}</textarea>`;
        if (game.user.isGM){content += `<button type="button" name="save">Save</button>`;}       
        var contentsObject = {content:`${content}`}
        return contentsObject;
    }
}

