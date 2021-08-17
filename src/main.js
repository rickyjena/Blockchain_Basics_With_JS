const {Blockchain, Transaction} = require('./blockchain');

let rickCoin = new Blockchain();
rickCoin.createTransaction(new Transaction('address1', 'address2', 150));
rickCoin.createTransaction(new Transaction('address2', 'address1', 45));

console.log('\n Starting miner ...');
rickCoin.minePendingTransaction('derricks-address');

console.log('\nBalance of Derrick is', rickCoin.getBalanceOfAddress('derricks-address'));

console.log('\n Starting miner again...');
rickCoin.minePendingTransaction('derricks-address');

console.log('\nBalance of Derrick is', rickCoin.getBalanceOfAddress('derricks-address'));