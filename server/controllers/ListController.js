import express from 'express'
// import UserService from '../services/UserService'
import ListService from '../services/ListService'

let _service = new ListService()
let _repo = _service.repository
// let _userRepo = _userService.repository
// let _userService = new UserService()

export default class ListController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllLists)
      .get('/:id', this.getListById)
      // .use(Authorize.authenticated)
      .post('', this.createList)
      .put('/:id', this.editList)
      .delete('/:id', this.deleteList)
      .use(this.defaultRoute)
  }

  async getAllLists(req, res, next) {
    try {
      let lists = await _repo.find({}).populate('board')
      return res.send(lists)
    } catch (error) { next(error) }
  }

  async getListById(req, res, next) {
    try {
      let list = await _repo.findById(req.params.id).populate('board')
      return res.send(list)
    } catch (error) { next(error) }
  }

  async createList(req, res, next) {
    try {
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
      let list = await _repo.findByIdAndDelete(req.params.id)
      return res.send("It's Gone!")
    } catch (error) { next(error) }
  }

  defaultRoute(req, res, next) {
    next({ status: 400, message: "No Such List - Go Home" })
  }


}