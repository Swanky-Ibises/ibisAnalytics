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

  /* linkClick route */
  //GET request for all data
  app.get('/linkClickAll', function(req, res) {
    //find all urls in database
    model.linkClickModel.find({}, function(err, links) {
      if(err) {
        throw err;
      } else {
        res.status(200).send(links);
      }
    });
  });


  app.get('/:domain/linkClickAll', function(req, res) {
    //find all urls in database
    var domain = req.params.domain;
    console.log('get from this domain', domain)
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


  //GET request for a specified url
  app.get('/linkClick', function(req, res) {
    //pull url from query
    var url = req.query.url;
    //find url in database
    model.linkClickModel.findOne({url: url}, function(err, link) {
      if(err) {
        throw err;
      } else {
        res.status(200).send(link);
      }
    });
  });


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


  //POST request
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


  /* pageView route */
  //GET request for a specified page
  app.get('/pageViewAll', function(req, res) {
    //find all pages in database
    model.pageViewModel.find({}, function(err, pages) {
      if(err) {
        throw err;
      } else {
        res.status(200).send(pages);
      }
    });
  });

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

  //GET request for a specified page
  app.get('/pageView', function(req, res) {
    //pull title from query
    var title = req.query.title;
    //find title in database
    model.pageViewModel.findOne({title: title}, function(err, page) {
        if (err) {
        throw err;
      } else {
        res.status(200).send(page);
      }
    });
  });

  app.get('/:domain/pageview', function(req, res) {
    var domain = req.params.domain;
    var title = req.query.title;
    model.pageViewModel.find({domain}, function(err, pageViews) {
      model.pageViewModel.find({title}, function(err, pageView) {
        if (err) {
          console.log(`error in fetching all page views for domain: ${domain}, title: ${title}`);
          res.send(err);
        } else {
          res.status(200).send(pageView);
        }
      })
    });
  });

  //POST request
  //No longer need this route. Instead in pagetime post route
  // app.post('/pageView', function(req, res) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   //pull title from request body
  //   var title = req.body.title;
  //   //create new timestamp
  //   var date = Date();
  //   //check if title exists in database
  //   model.pageViewModel.findOne({title: title}, function(err, page) {
  //     console.log('existing title',title);
  //     //if it exists, update count and add timestamp
  //     if(page) {
  //       page.count++;
  //       page.date.push(date);
  //       page.save();
  //       res.status(200).send("Successfully updated page count");
  //     //if not, create new record, set count to 1 and add timestamp (in array)
  //     } else {
  //       console.log('new title',title);
  //       model.pageViewModel.create({
  //         title: title,
  //         count: 1,
  //         date: [date]
  //       }, function(err) {
  //         if(err) {
  //           throw err;
  //         } else {
  //           res.status(200).send("Successfully created new page record");
  //         }
  //       });
  //     }
  //   });
  // });

  app.post('/pagetime', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('new location', req.body.newLocation);
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
        console.log('error in finding pagetime model');
        res.send(err);
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
          saveNewModel(pageView, 'new pageView increment');
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
    console.log('this object', storedObject);
  });


  app.post('/create', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var email = req.body.email;
    var domain = req.body.domain;
    var newUser = new model.userModel({
      email,
      domain
    });
    saveNewModel(newUser, 'new user model');
    console.log('req.body.domain',req.body);
    var newPageTime = new model.pageTimeModel({
      domain,
      timesArray: []
    });
    saveNewModel(newPageTime, 'pageTime model');
    var newAddress = new model.addressModel({
      domain,
      addressArray: []
    });
    saveNewModel(newAddress, 'address model');
    console.log(`created a model for username: ${email} , domain: ${domain}`);
    var newLink
    res.send('user created');
  });

  app.get('/:domain/pagetime', function(req, res, next) {
    model.pageTimeModel.findOne({domain: req.params.domain}, function(err, time) {
      if(err) {
        console.log('error in finding domain pagetimeview');
        res.status(500).send(err);
      } else {
        res.status(200).send(time);
      }
    });
  });

  app.get('/:email/domainName', function(req, res) {
    model.userModel.findOne({email: req.params.email}, function(err, user) {
      if (err) {
        console.log('error in retrieving user');
        res.status(500).send(err);
      } else {
        console.log(user);
        res.status(200).send(user.domain);
      }
    });
  });

  app.post('/:domain/address', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    model.addressModel.findOne({domain: req.params.domain})
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
          console.log('addressData', addressData);
        } else {
          console.log('error in retrieving address data. Check to see if user has signed up domain in analytics');
          res.status(500).send(err);
        }
      });
  });
};



