import express from 'express'
// import UserService from '../services/UserService'
import ListService from '../services/ListService'
import TaskService from '../services/TaskService';
import { Authorize } from '../middlewear/authorize'

let _service = new ListService()
let _repo = _service.repository
let _taskService = new TaskService()
let _taskRepo = _taskService.repository
// let _userRepo = _userService.repository
// let _userService = new UserService()

export default class ListController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllLists)
      .get('/:id', this.getListById)
      .get('/:id/tasks', this.getTasks)
      .use(Authorize.authenticated)
      .post('', this.createList)
      .put('/:id', this.editList)
      .delete('/:id', this.deleteList)
      .use(this.defaultRoute)
  }

  async getAllLists(req, res, next) {
    try {
      let lists = await _repo.find({})
      return res.send(lists)
    } catch (error) { next(error) }
  }

  async getListById(req, res, next) {
    try {
      let list = await _repo.findById(req.params.id)
      return res.send(list)
    } catch (error) { next(error) }
  }
  async getTasks(req, res, next) {
    try {
      let data = await _taskRepo.find({ listId: req.params.id, authorId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }
  async createList(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let list = await _repo.create(req.body)
      return res.status(201).send(list)
    } catch (error) { next(error) }
  }

  async editList(req, res, next) {
    try {
      let list = await _repo.findOneAndUpdate(req.params.id, req.body).populate('board') //need to save and update (replace) old list with updated list
      return res.send(list)
    } catch (error) { next(error) }
  }

  async deleteList(req, res, next) {
    try {
      let list = await _repo.findOne({ _id: req.params.id, authorId: req.session.uid })
      await list.remove()
      return res.send("It's Gone!")
    } catch (error) { next(error) }
  }

  defaultRoute(req, res, next) {
    next({ status: 400, message: "No Such List - Go Home" })
  }

}