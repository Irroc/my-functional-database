const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const data = await Tag.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findOne({
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
    const data = await Tag.create({
      ...req.body,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Tag.update(
      {
        // You can only update a tag_name by attaching it to the request body.
        tag_name: req.body.tag_name
      },
      {
        // Gets the Category based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      })
    updated = { tag_name: req.body.tag_name }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy(
      {
        // destroys the Tag based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      })
    updated = { tag_name: req.body.tag_name }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
