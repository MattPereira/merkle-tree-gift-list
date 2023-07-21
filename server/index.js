const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "f1531cce71851a41330624e1aa20dfd9d0c1f0347120f5122683d801d074c56a";

/**
 *  the Merkle Root is a concise way to represent a whole set of data
 *  a Merkle Proof uses the properties of the Merkle tree to prove
 *  that a specific piece of data (name)
 *  is part of the set represented by the Merkle Root
 */

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
