import TaskService from '../services/TaskService'
import express from 'express'

let _service = new TaskService()
let _repo = _service.repository

export default class TaskController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAll)
      // .get('/:id/tasks/', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .put('/:id/comments', this.commentsRoute)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }

  async getAll(req, res, next) {
    try {
      let data = await _repo.find({})
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  // async getById(req, res, next) {
  //   try {
  //     let data = await _repo.findOne({ _id: req.params.id}).populate('list')
  //     return res.send(data)
  //   } catch (error) { next(error) }
  // }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _repo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _repo.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) { next(error) }
  }

  async commentsRoute(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let task = await _service.commentsRoute(req.params.id, req.body)
      return res.status(200).send(task)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}