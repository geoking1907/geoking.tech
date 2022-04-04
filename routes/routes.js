const {Router} = require('express')

const router = Router()


router.get('/', function(req, res) {
  res.render('index', {
    title: 'Аракелян Георгий'
  })
});

router.use((req, res, next) => {
  res.status(404).render('error', {
    title: 'Где мы?!'
  })
})

module.exports = router
