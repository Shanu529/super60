const asyncHandler = require('express-async-handler')

/**
 * Builds a standard set of REST handlers (list/get/create/update/delete)
 * for a simple Mongoose model. Used for Faculty, Projects, Events,
 * Gallery and Announcements so each of those files stays tiny.
 *
 * options.searchableSlug: if true, getOne will also try matching the
 * `slug` field (used by Projects, whose public detail page is fetched
 * by slug rather than _id).
 */
function buildCrudController(Model, { searchableSlug = false, defaultSort = '-createdAt' } = {}) {
  const getAll = asyncHandler(async (req, res) => {
    const filter = {}
    if (req.query.featured !== undefined) {
      filter.featured = req.query.featured === 'true'
    }
    let query = Model.find(filter).sort(defaultSort)
    if (req.query.limit) query = query.limit(Number(req.query.limit))
    const items = await query
    res.json({ success: true, data: items })
  })

  const getOne = asyncHandler(async (req, res) => {
    const { id } = req.params
    let item = null
    if (searchableSlug) {
      item = await Model.findOne({ slug: id })
    }
    if (!item && id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Model.findById(id)
    }
    if (!item) {
      res.status(404)
      throw new Error('Not found')
    }
    res.json({ success: true, data: item })
  })

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body)
    res.status(201).json({ success: true, data: item })
  })

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) {
      res.status(404)
      throw new Error('Not found')
    }
    res.json({ success: true, data: item })
  })

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id)
    if (!item) {
      res.status(404)
      throw new Error('Not found')
    }
    res.json({ success: true, data: {} })
  })

  return { getAll, getOne, create, update, remove }
}

/**
 * Builds get/upsert handlers for "singleton" content — a model that
 * should only ever have one document (HOD, Mentor, Academic Teacher).
 */
function buildSingletonController(Model) {
  const get = asyncHandler(async (req, res) => {
    const item = await Model.findOne()
    res.json({ success: true, data: item || {} })
  })

  const upsert = asyncHandler(async (req, res) => {
    let item = await Model.findOne()
    if (item) {
      item = await Model.findByIdAndUpdate(item._id, req.body, { new: true, runValidators: true })
    } else {
      item = await Model.create(req.body)
    }
    res.json({ success: true, data: item })
  })

  return { get, upsert }
}

module.exports = { buildCrudController, buildSingletonController }
