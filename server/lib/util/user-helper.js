"use strict";

const Chance = require("chance");
const chance = new Chance();

const md5 = require('md5');

module.exports = {

  generateRandomUser: (req) => {
    //const gender    = chance.gender();
    //const firstName = chance.first({gender: gender});
    //const lastName  = chance.last();
    //const firstName = req.body.firstName;
    //const lastName = req.body.lastName;
    const userName  = req.body.userName;

    let userHandle = "@" + userName;
    const avatarUrlPrefix = `https://vanillicon.com/${md5(userHandle)}`;
    const avatars = {
      small:   `${avatarUrlPrefix}_50.png`,
      regular: `${avatarUrlPrefix}.png`,
      large:   `${avatarUrlPrefix}_200.png`
    };

    return {
      name: userName,
      handle: userHandle,
      avatars: avatars
    };
  }
};
