//require schemas from Models folder
var model = require('./models.js')

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

  //POST request
  app.post('/linkClick', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //pull url from request body
    var url = req.body.url;
    //create new timestamp
    var date = Date();
    //check if url exists in database
    model.linkClickModel.findOne({url: url}, function(err, link) {
      //if it exists, update count and add timestamp
      if(link) {
        link.count++;
        link.date.push(date);
        link.save();
        res.status(200).send("Successfully updated link count")
      //if not, create new record, set count to 1 and add timestamp (in array)
      } else {
        model.linkClickModel.create({
          url: url,
          count: 1,
          date: [date]
        }, function(err) {
          if(err) {
            throw err;
          } else {
            res.status(200).send("Successfully created new link record");
          }
        });
      }
    });
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

  //GET request for a specified page
  app.get('/pageView', function(req, res) {
    //pull title from query
    var title = req.query.title;
    //find title in database
    model.pageViewModel.findOne({title: title}, function(err, page) {
        if(err) {
        throw err;
      } else {
        res.status(200).send(page);
      }
    });
  });

  //POST request
  app.post('/pageView', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //pull title from request body
    var title = req.body.title;
    //create new timestamp
    var date = Date();
    //check if title exists in database
    model.pageViewModel.findOne({title: title}, function(err, page) {
      //if it exists, update count and add timestamp
      if(page) {
        page.count++;
        page.date.push(date);
        page.save();
        res.status(200).send("Successfully updated page count")
      //if not, create new record, set count to 1 and add timestamp (in array)
      } else {
        model.pageViewModel.create({
          title: title,
          count: 1,
          date: [date]
        }, function(err) {
          if(err) {
            throw err;
          } else {
            res.status(200).send("Successfully created new page record");
          }
        });
      }
    });
  });

  app.post('/pagetime', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var storedObject = {
      timeDifference: req.body.timeDifference,
      location: req.body.location,
      date: req.body.date
    };
    var domain = req.body.domain;
    model.pageTimeModel.findOne({domain: domain})
      .exec(function(err, pageTimes) {
        if (pageTimes) {
          if (pageTimes.timesArray.length >= 200) {
            pageTimes.timesArray.shift();
          }
          pageTimes.timesArray.push(storedObject);
          pageTimes.save(function(err, user) {
            if (err) {
              console.log('error in saving page');
              res.status(500).send(err);
            } else {
              console.log('timesArray push success!');
              res.send(user);
            }
          });
        } else {
          console.log('error in finding pagetime model');
          res.send(err);
        }
      })
    console.log('this object', storedObject);
  });

  app.post('/create', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var username = req.body.username;
    var domain = req.body.domain;
    var newDomain = new model.pageTimeModel({
      username: username,
      domain: domain,
      timesArray: []
    });
    newDomain.save(function(err, user) {
      if (err) {
        console.log('error')
        res.send(err);
      } else {
        console.log('user created');
        res.send(user);
      }
    })
  });

  app.get('/:username/pagetime', function(req, res, next) {
    model.pageTimeModel.findOne({username: req.params.username}, function(err, time) {
      if(err) {
        console.log('error in finding username pagetimeview');
        throw err;
      } else {
        res.status(200).send(time);
      }
    });
  });

};



