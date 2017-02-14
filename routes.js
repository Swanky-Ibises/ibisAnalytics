//require schemas from Models folder
var model = require('./models.js')

//function for saving the model to the database
var saveNewModel = function(model, modelName) {
  model.save(function(err, user) {
    if (err) {
      console.log('error in saving new', modelName);
      res.send(err);
    } else {
      console.log(`new ${modelName} created`);
    }
  });
}

//export routes to app file
module.exports = function(app, express) {


  //This route gets all the link clicks for a particular domain. Put the name of the domain in the path to use
  app.get('/:domain/linkClickAll', function(req, res) {
    //find all urls in database
    var domain = req.params.domain;
    model.linkClickModel.find({domain})
    .exec(function(err, linkClicks) {
      if (err) {
        console.log('error in fetching all link clicks for ', domain);
        res.send(err);
      } else {
        res.status(200).send(linkClicks);
      }
    });
  });


  //This route gets all the link clicks for a particular domain. Put the name of the domain in the path to use
  app.get('/:domain/linkClick', function(req, res) {
    var domain = req.params.domain;
    var url = req.query.url;
    model.linkClickModel.find({domain}, function(err, links) {
      model.linkClickModel.find({url}, function(err, link) {
        if (err) {
          console.log(`error in fetching all link clicks for domain: ${domain}, url: ${url}`);
          res.send(err);
        } else {
          res.status(200).send(link);
        }
      })
    });
  });


  //POST request for a link click
  app.post('/linkClick', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //pull url from request body
    var url = req.body.url;
    var domain = req.body.domain;
    console.log('url for link click', req.body);
    //create new timestamp
    var date = Date();
    //check if url exists in database
    console.log('post to this domain', domain)
    model.linkClickModel.find({domain: domain})
    .exec(function(err, links) {
      if (err) {
        console.log('error in retrieving links from domain');
        res.send(err);
      } else {
        model.linkClickModel.findOne({url: url})
        .exec(function(err, link) {
          if(link) {
            link.count++;
            link.date.push(date);
            link.save();
            console.log("Successfully updated link count");
            res.status(200).send("Successfully updated link count")
          //if not, create new record, set count to 1 and add timestamp (in array)
          } else {
            model.linkClickModel.create({
              domain,
              url: url,
              count: 1,
              date: [date]
            }, function(err) {
              if(err) {
                throw err;
              } else {
                console.log("Successfully created new link record");
                res.status(200).send("Successfully created new link record");
              }
            });
          }
        })
      }
    });
      //if it exists, update count and add timestamp
  });

  //This route gets all the page views for a particular domain. Put the name of the domain in the path to use
  app.get('/:domain/pageviewall', function(req, res) {
    var domain = req.params.domain;
    model.pageViewModel.find({domain})
    .exec(function(err, pageViews) {
       if (err) {
        console.log('error in fetching all page views for ', domain);
        res.status(500).send(err);
      } else {
        res.status(200).send(pageViews);
      }
    });
  });


  //This route gets one pages views for a particular domain. Put the name of the domain in the path to use
  app.get('/:domain/pageview', function(req, res) {
    var domain = req.params.domain;
    var title = req.query.title;
    console.log('domain ', domain)
    console.log('title', title);
    model.pageViewModel.find({domain}, function(err, pageViews) {
      console.log('pageViews', pageViews);
      model.pageViewModel.find({title}, function(err, pageView) {
        console.log('PAGE VIEW HERE', pageView)
        if (err) {
          console.log(`error in fetching all page views for domain: ${domain}, title: ${title}`);
          res.send(err);
        } else {
          res.status(200).send(pageView);
        }
      })
    });
  });

  //This post route creates or pushes into the pagetime model. Additionally, this route will create or push into the pageview model
  app.post('/pagetime', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var storedObject = {
      timeDifference: req.body.timeDifference,
      location: req.body.location,
      date: req.body.date
    };
    var domain = req.body.domain;
    console.log('domain',domain);
    model.pageTimeModel.findOne({domain: domain})
    .exec(function(err, pageTimes) {
      if (pageTimes) {
        if (pageTimes.timesArray.length >= 200) {
          pageTimes.timesArray.shift();
        }
        pageTimes.timesArray.push(storedObject);
        saveNewModel(pageTimes, 'new pageTime data');
        // res.send('new pagetime data posted');
      } else {
        var newPageTime = new model.pageTimeModel({
          domain,
          timesArray: []
        });
        saveNewModel(newPageTime, 'pageTime model');
      }
    });
    var title = req.body.newLocation;
    var date = Date();
    //title will be undefined if client navigates to another domain
    if (title) {
      model.pageViewModel.findOne({title: title})
      .exec(function(err, pageView) {
        if (pageView) {
          pageView.count++;
          pageView.date.push(req.body.date);
          saveNewModel(pageView, 'new pageView increments');
        } else {
          model.pageViewModel.create({domain, title, count:1, date: [date]}, function(err, pageView) {
            if (err) {
              console.log('error in creating pageView model');
              res.send(err);
            } else {
              console.log('Successfully created pageView model');
            }
          });
        }
      });
    }
    res.status(201).send('new page data posted');
  });



  app.get('/:domain/pagetime', function(req, res) {
    model.pageTimeModel.findOne({domain: req.params.domain}, function(err, time) {
      if(err) {
        console.log('error in finding domain pagetimeview');
        res.status(500).send(err);
      } else {
        res.status(200).send(time);
      }
    });
  });


  //This post route creates a new user model with email and domain
  app.post('/create', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var email = req.body.email;
    var domain = req.body.domain;
    var newUser = new model.userModel({
      email,
      domain
    });
    saveNewModel(newUser, 'new user model');
    console.log('req.body.domain',req.body);
    console.log(`created a model for username: ${email} , domain: ${domain}`);
    res.send(newUser);
  });


  //This get route fetches the domain name when given an email
  app.get('/:email/domainName', function(req, res) {
    model.userModel.findOne({email: req.params.email}, function(err, user) {
      if (err) {
        console.log('error in retrieving user');
        res.status(500).send(err);
      } else {
        console.log(user);
        if (!user || !user.domain) {
          res.status(200).send('User or user domain does not currently exist');
        } else {
          res.status(200).send(user.domain);
        }
      }
    });
  });


  //This post route updates the domain name when given an email
  app.post('/:email/updateDomain', function(req, res) {
    var newDomain = req.body.domain;
    model.userModel.findOne({email: req.params.email}, function(err, user) {
      if (err) {
        console.log('error in retrieving user');
        res.status(500).send(err);
      } else {
        if (!user) {
          res.status(200).send('User does not currently exist');
        } else {
          user.domain = newDomain;
          res.send(user);
          saveNewModel(user, 'user domain updated');
        }
      }
    });
  });


  //This post route creates or pushes a new address to the address model.. Put the name of the domain in the path to use
  app.post('/:domain/address', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var domain = req.params.domain;
    model.addressModel.findOne({domain})
    .exec(function(err, addressData) {
      if (addressData) {
        console.log('addressData', addressData);
        var locationArr = addressData.locationArray;
        if (locationArr.length >= 100) {
          locationArr.shift();
        }
        //Checks to see if IP address is already in location array
        var ipExists = false;
        for (let i = 0; i < locationArr.length; i++) {
          if (locationArr[i].ip === req.body.ip) {
            console.log('Ip address already exists in location array, address not saved');
            ipExists = true;
            res.send('Ip address already exists in location array, address not saved');
            return;
          }
        }
        if (!ipExists) {
          locationArr.push(req.body);
          saveNewModel(addressData, 'new location added');
          res.send('address posted to array');
        }
      } else {
        var newAddress = new model.addressModel({
          domain,
          addressArray: []
        });
        saveNewModel(newAddress, 'address model');
      }
    });
  });


  //This route gets all the addresses for a particular domain. Returns an array of addresses. Put the name of the domain in the path to use
  app.get('/:domain/addresses', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var domain = req.params.domain;
    model.addressModel.find({domain})
    .exec(function(err, addresses) {
      if (err) {
        console.log('error in fetching addresses');
        res.status(500).send(err);
      } else {
        if (addresses.length > 0) {
          res.status(200).send(addresses[0].locationArray);
        } else {
          res.status(200).send([]);
        }
      }
    });
  })
};



