/**
 * Mongoose model for pokemon data.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  generation: {
    type: Number,
    required: true,
    trim: true
  },
  height: {
    type: Number,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: true,
    trim: true
  },
  type1: {
    type: String,
    required: true,
    trim: true
  },
  type2: {
    type: String,
    required: false,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  hp: {
    type: Number,
    required: true,
    trim: true
  },
  attack: {
    type: Number,
    required: true,
    trim: true
  },
  defense: {
    type: Number,
    required: true,
    trim: true
  },
  specialAttack: {
    type: Number,
    required: true,
    trim: true
  },
  specialDefense: {
    type: Number,
    required: true,
    trim: true
  },
  speed: {
    type: Number,
    required: true,
    trim: true
  },
  total: {
    type: Number,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Create a model using the schema.
export const Pokemon = mongoose.model('Pokemon', schema)
