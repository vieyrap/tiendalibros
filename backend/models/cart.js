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

    this.reduceByOne= function(id) {
        this.items[id].cantidad--
        this.items[id].precio -= this.items[id].item.precio
        
        this.cantidadTotal--
        const restaPrecioTotal = this.precioTotal - this.items[id].item.precio
        this.precioTotal = restaPrecioTotal.toFixed(2)

        if(this.items[id].cantidad <= 0){
            delete this.items[id]
        }
    }
    this.eliminarItem = function(id) {
        this.cantidadTotal -= this.items[id].cantidad
        this.precioTotal = this.precioTotal - this.items[id].precio
        this.precioTotal = this.precioTotal.toFixed(2)
        //this.precioTotal = restaPrecioTotal.toFixed(2)
        delete this.items[id]
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