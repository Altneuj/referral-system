const passport = require('passport');
const Organizations = require('../models/Organization');
const Users = require('../models/User');
const Referral = require('../models/Referral');
const mongoose = require('mongoose');

module.exports = app => {
  // create fake referrals
  app.get('/api/fake-referrals', async (request, response) => {
    Referral.collection.drop();

    let organizationNames = ["HewDesign", "JeffHacks", "RoyRuler"];
    let usernames = ["userA", "userB", "userC"];
    let clientNames = ["Roy", "Jeff", "Ilona"];
    let referralArray = [];
    let statusArray = ["pending", "accepted", "contacted", "rejected", "completed"]

    let organizationObject = await Promise.all(organizationNames.map(organization => {
      return Organizations.findOne({ organizationName: organization }).then(result => {
        if (result) {
          return result
        }
      })
    }));

    let userObject = await Promise.all(usernames.map(user => {
      return Users.findOne({ username: user }).then(result => {
        if (result) {
          return result
        }
      })
    }));
    
    for (x = 0; x < 10; x++){
      for (i = 0; i < 2; i++) {
        let newReferral = new Referral({
          client_name: clientNames[i],
          client_phone: "(919)999-9999",
          client_email: "random@example.com",
          description: `Important from ${organizationObject[i].organizationName}`,
          referring_organization: organizationObject[i].id,
          receiving_organization: organizationObject[i + 1].id,
          referring_user: userObject[i].id,
          posting_user: userObject[i].id,
          tasks: [{ text: `hi from ${userObject[i].firstName}`, posting_user: userObject[i].firstName }],
          status: statusArray[Math.floor(Math.random() * Math.floor(5))]
        })
  
        newReferral.save();
        referralArray.push(newReferral);
      }
    }

    return response.send(referralArray);
  })
}