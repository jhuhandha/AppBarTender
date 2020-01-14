const {Drink} = require ('./../models');
const path = require ('path');
const fs = require ('fs');

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
        err,
      })
    );
};

const showImage = (req, res) => {
  let ruta = path.join (__dirname, './../uploads/drinks/', req.params.image);
  return res.sendFile (ruta);
};

const save = (req, res) => {
  if (!req.files) return res.status (400).send ('No files were uploaded.');

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
        err,
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
        console.log(drink)
      fs.unlinkSync (`uploads/drinks/${drink.icon}`);

      let image = req.files.image;
      image.mv (`uploads/drinks/${image.name}`, err => {
        if (err) return res.status (500).send (err);
        callback({...data, icon : image.name});
      });

    });
  } else {
    callback (data);
  }
};

const modify = (req, res) => {
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
