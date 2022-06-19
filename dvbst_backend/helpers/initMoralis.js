const serverUrl = "https://eyg9pkk7sxqz.usemoralis.com:2053/server";
const appId = "BLSQzedfs3XkETYSNsXVIRPvyYJiIeJBRR1vd2Kn";
const masterKey = "6ViXsWxbr8twZ1oBJuj8Hm61Fnoa8Fe3OHdGVbpl";
const moralisSecret =
  "8Bi6dpXknRSRJIvM6IRZjwDFQwRhL6S5fK7fQJbXLZAH35qG4N4T6RDr3hsKgK7C";

const ganacheserverUrl = "https://upo0pf2qzrb5.usemoralis.com:2053/server";
const ganacheappId = "l2iSil7CMHrhypcuog84VP1RgOkpDJ7QJC93VX5d";
const ganachemasterKey = "LTdNesWhBHTYBaEZYkSSluxq3yoY5DM3Vgce2dUj";
const ganachemoralisSecret =
  "z9dW5ks7iZlvlMBDyiVfswtt5EGarIQGy1DBtosGOydfdi9wBfa4jTiA654Ikk81";
const Moralis = require("moralis/node");
require("dotenv").config();

module.exports = async function initMoralis() {
  // return await Moralis.start({ serverUrl, appId, moralisSecret });
  return await Moralis.start({
    serverUrl: ganacheserverUrl,
    appId: ganacheappId,
    moralisSecret: ganachemoralisSecret,
  });
};
