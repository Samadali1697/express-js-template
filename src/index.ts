import express from 'express';

const app = express();
app.listen(4000, () => {
    type Pizza ={
        id: number;
        name: string;
        price: number;
      }

      var menu = [
        { id: 1, name: "Margherita", price: 5.5 }
      ];

      var placeOrder = function (pizzaName: string) {
        return menu[0];
      };

      console.log(placeOrder("test"));
      console.log(placeOrder("test"));
});