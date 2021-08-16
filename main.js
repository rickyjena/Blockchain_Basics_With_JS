const SHA256 = require("crypto-js/sha256")

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block("08/09/2021", "Genesis block", "0");
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let rickCoin = new Blockchain();

// console.log('Mining Block 1...');
// rickCoin.addBlock(new Block(1, "08/08/2021", { amount: 10}));

// console.log('Mining Block 2...');
// rickCoin.addBlock(new Block(2, "08/07/2021", { amount: 20}));

// // console.log(JSON.stringify(rickCoin, null, 3));

// // console.log("Is blockchain valid? " + rickCoin.isChainValid());

// // rickCoin.chain[1].data = {amount:500};
// // rickCoin.chain[1].hash = rickCoin.chain[1].calculateHash();

// // console.log(JSON.stringify(rickCoin, null, 3));

// // console.log("Is blockchain valid? " + rickCoin.isChainValid());