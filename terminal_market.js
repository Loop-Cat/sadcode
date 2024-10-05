const Prices = require('price_list');

const TerminalMarket = {
    
    auto_sell: function(terminal, type, minimal_price){
        let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: type}).filter(order => order.amount > 0).sort((a, b) => {
            return b.price - a.price;
        });
        if (orders.length > 0){
            if (orders[0].price >= minimal_price && terminal.store[type] > 0){
                const amount = Math.min(terminal.store[type], orders[0].amount)
                console.log(terminal.room.name, '- wants to sell', type, 'for', orders[0].price, 'per unit :3', Game.market.deal(orders[0].id, amount, terminal.room.name));
            }
        }
	},
	
    auto_buy: function(terminal, boost_type, maximum_price) {
        let orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: boost_type}).filter(order => order.amount > 0).sort((a, b) => {
            return a.price - b.price;
        });
        if (orders.length == 0) {return}
        if (orders[0].price <= maximum_price && Game.market.credits > 1000000){
            console.log(terminal.room.name, '- wants to buy', boost_type, 'for', orders[0].price, 'per unit :3 ', Game.market.deal(orders[0].id, 1000, terminal.room.name));
        }
	}
};

module.exports = TerminalMarket;