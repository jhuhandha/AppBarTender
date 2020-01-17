const path = require ('path');
const fs = require ('fs');
const {validationResult} = require ('express-validator');

const {Drink} = require ('./../models');

const index = (req, res) => {
  Drink.findAll ()
    .then (drinks =>
      res.json ({
        ok: true,
        drinks,
      })
    )
    .catch (err =>
      res.status (500).json ({
        ok: false,
        message : err.message,
      })
    );
};

const showImage = (req, res) => {
  let ruta = path.join (__dirname, './../uploads/drinks/', req.params.image);
  return res.sendFile (ruta);
};

const save = (req, res) => {
  const errors = validationResult (req);
  if (!errors.isEmpty ()) {
    return res.status (422).json ({ok:false, err: errors.array ()});
  }

  if (!req.files)
    return res.status (400).json ({ok: false, err: 'No files were uploaded.'});

  let image = req.files.image;

  image.mv (`uploads/drinks/${image.name}`, err => {
    if (err) return res.status (500).send (err);

    Drink.create ({
      name: req.body.name,
      icon: image.name,
      unit_price: req.body.unit_price,
    })
      .then (result =>
        res.json ({
          ok: true,
          result,
        })
      )
      .catch (err =>
        res.status (500).json ({
          ok: false,
          err,
        })
      );
  });
};

const edit = (req, res) => {
  Drink.findByPk (req.params.id)
    .then (drinks =>
      res.json ({
        ok: true,
        drinks,
      })
    )
    .catch (err =>
      res.status (500).json ({
        ok: false,
        message : err.message,
      })
    );
};

const updateImage = (req, callback) => {
  let data = {
    name: req.body.name,
    unit_price: req.body.unit_price,
  };

  if (req.files) {
    Drink.findByPk (req.params.id).then (drink => {
      console.log (drink);
      fs.unlinkSync (`uploads/drinks/${drink.icon}`);

      let image = req.files.image;
      image.mv (`uploads/drinks/${image.name}`, err => {
        if (err) return res.status (500).send (err);
        callback ({...data, icon: image.name});
      });
    });
  } else {
    callback (data);
  }
};

const modify = (req, res) => {
  const errors = validationResult (req);
  if (!errors.isEmpty ()) {
    return res.status (422).json ({err: errors.array ()});
  }

  updateImage (req, data => {
    Drink.update (data, {
      where: {
        id: req.params.id,
      },
    })
      .then (result =>
        res.json ({
          ok: true,
          result,
        })
      )
      .catch (err =>
        res.status (500).json ({
          ok: false,
          err,
        })
      );
  });
};

module.exports = {
  index,
  save,
  edit,
  modify,
  showImage,
};
