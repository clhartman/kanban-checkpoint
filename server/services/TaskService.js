import mongoose from 'mongoose';

let ObjectId = mongoose.Schema.Types.ObjectId

let _commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'task', required: true }

}, { timestamps: true })

let _schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'list', required: true },
  authorId: { type: ObjectId, ref: 'user', required: true },
  comments: [_commentSchema]

})

export default class TaskService {
  get repository() {
    return mongoose.model('task', _schema)
  }

  async commentsRoute(id, comment) {
    try {
      //review this for understanding and clarification
      let task = await this.repository.findById(id)
      if (!comment._id) { //add comment
        task.comments.push(comment)
      } else { // delete comment
        task.comments.forEach((c, i, a) => {
          if (c._id.toString() == comment._id) {
            a.splice(i, 1)
          }
        })
      }
      await task.update()
      return task
    } catch (e) { console.error(e) }
  }
}