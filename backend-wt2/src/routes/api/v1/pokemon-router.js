/**
 * Pokemon routes.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import express from 'express'
import { PokemonController } from '../../../controllers/pokemon-controller.js'

export const router = express.Router()

const controller = new PokemonController()

router.get('/', (req, res, next) => controller.findAll(req, res, next))

router.get('/sort/total', (req, res, next) => controller.sortAllByTotal(req, res, next))

router.get('/clusters', (req, res, next) => controller.getClusters(req, res, next))
router.get('/:number', (req, res, next) => controller.findByNumber(req, res, next))
router.get('/clusters/average', (req, res, next) => controller.getCentroidsOfClusters(req, res, next))
router.get('/types/:type', (req, res, next) => controller.getPokemonByType(req, res, next))
