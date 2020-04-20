const garbageManager = {
    remove(obj, array){
        const i = array.indexOf(obj)
        array.splice(i, 1)
    }

}
export default garbageManager