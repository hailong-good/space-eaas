const DbSymbol = Symbol('Application#db');
module.exports = {
    get db() {
        console.info(this, '11111111111111111')
        if(!this[DbSymbol]){
            this[DbSymbol] = '';
        }
    }
}