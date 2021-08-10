const SHA256 = require("crypto-js/sha256")

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "08/09/2021", "Genesis block", "0");
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
rickCoin.addBlock(new Block(1, "08/08/2021", { amount: 10}));
rickCoin.addBlock(new Block(2, "08/07/2021", { amount: 20}));

console.log(JSON.stringify(rickCoin, null, 3));

console.log("Is blockchain valid? " + rickCoin.isChainValid());

rickCoin.chain[1].data = {amount:500};
rickCoin.chain[1].hash = rickCoin.chain[1].calculateHash();

console.log(JSON.stringify(rickCoin, null, 3));

console.log("Is blockchain valid? " + rickCoin.isChainValid());