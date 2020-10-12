const express = require('express');
const db = require ('../data/helpers/actionModel')
const router = express.Router()

router.get('/:id/actions', validateActionId, (req, res, next) => {
    db.get(req.params.id)
        .then(actions => res.status(200).json(actions))
        .catch(error=>{next(error)})
})

router.get('/action/:id', validateActionId, (req, res, next) => {
    db.get(req.params.id)
        .then(action=> res.status(200).json(action))
        .catch(error=>{next(error)})
})

router.get('/actions/all', (req,res,next) => {
    db.get()
        .then(actions=> res.status(200).json(actions))
        .catch(error => {next(error)})
})

router.post('/actions', validateAction, (req, res, next) => {
    db.insert (req.body)
        .then(update => res.status(200).json(update))
        .catch(error=> {next(error)})
})

router.put('/actions/:id', validateAction, (req, res, next) => {
    db.update(req.params.id, req.body)
        .then(update => res.status(200).json(update))
        .catch(error=>{next(error)})
})

router.delete('/actions/:id', validateActionId, (req, res, next) => {
    db.remove(req.params.id)
        .then(deleted => res.status(200).json({message: "Action deleted"}))
        .catch(error => {next(error)})
})

function validateActionId(req, res, next) {
    const actionId = req.params.id;
    db.get(actionId)
      .then(action => {
        if(!action) return res.status(404).json({message: "Action not found."});
        req.action = action;
        next();
      })
      .catch(error => next(error))
  }

function validateAction (req, res, next) {
    if (!req.body.description || !req.body.notes || !req.body.project_id) return res.status(400).json({errorMessage: "Please include description, project id, and notes for action."});
    next()
}

module.exports = router;