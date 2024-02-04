const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }]
    });
    if (data === null) {
      console.log('Not found!');
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await Category.create({
      ...req.body,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Category.update(
      {
        // You can only update a category_name by attaching it to the request body.
        category_name: req.body.category_name
      },
      {
        // Gets the Category based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      })
    updated = { category_name: req.body.category_name }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy(
      {
        // destroys the Category based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      })
    updated = { category_name: req.body.category_name }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
