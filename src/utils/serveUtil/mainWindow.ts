class WindowClass {
    mainWindow = null;
    setMainWindow(window: any) {
        this.mainWindow = window
    }

}
const obj = new WindowClass()
module.exports = {
    windowClass: obj 
}