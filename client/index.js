const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // send a proof and name to the server through the body of the post request

  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  const name = "Matt Pereira";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  console.log("proof", proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();
