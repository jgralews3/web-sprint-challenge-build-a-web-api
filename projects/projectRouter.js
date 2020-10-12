const express = require('express');
const { orWhereNotExists } = require('../data/dbConfig');
const db = require ('../data/helpers/projectModel')
const actiondb = require ('../data/helpers/actionModel')
const router = express.Router()

router.get('/', (req, res, next) => {
    db.get()
        .then(projects => res.status(201).json(projects))
        .catch(error => {next(error)})
})

router.get('/:id', validateProjectId, (req, res, next) => {
    db.get(req.params.id)
        .then(project => res.status(201).json(project))
        .catch(error => {next(error)})
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    db.getProjectActions(req.params.id)
        .then(actions => {
            if (!actions.length) {
                return res.status(400).json({message: "No actions found"})
            } else {
            res.status(201).json(actions)}
        })
        .catch(error=>{next(error)})
})

router.post('/', validateProject, (req, res, next) => {
    db.insert(req.body)
        .then(post => res.status(201).json(post))
        .catch(error=> {next(error)})
})

router.put('/:id', validateProjectId, (req, res, next) => {
    db.update(req.params.id, req.body)
        .then (update=> res.status(201).json(update))
        .catch (error => {next(error)})
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    db.remove(req.params.id)
        .then(deleted => res.status(200).json({message: "Post removed"}))
        .catch(error => {next(error)})
})

function validateProjectId(req, res, next) {
    const projectId = req.params.id;
    db.get(projectId)
      .then(project => {
        if(!project) return res.status(404).json({message: "Project not found."});
        req.project = project;
        next();
      })
      .catch(error => next(error))
  }

function validateProject (req, res, next) {
    if (!req.body.name || !req.body.description) return res.status(400).json({errorMessage: "Please provide name and description."});
    next();
}

module.exports = router;