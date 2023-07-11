function cart(oldCart){
    this.items = oldCart.items || {}
    this.cantidadTotal = oldCart.cantidadTotal || 0
    this.precioTotal = oldCart.precioTotal || 0

    this.add = function(item, id){
        var storedItem = this.items[id]
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, cantidad: 0, precio:0}
        }
        storedItem.cantidad++
        storedItem.precio = storedItem.item.precio * storedItem.cantidad
        this.cantidadTotal++
        this.precioTotal += storedItem.item.precio
    }
    this.generateArray = function(){
        var arr = []
        for(var id in this.items){
            arr.push(this.itmes[id])
        }
        return arr
    } 
}

export default cart