/**
 * Service for converting CSV files to JSON and storing the data in a MongoDB database.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import fs from 'fs'
import { parse } from 'csv-parse'
import { Pokemon } from '../models/pokemon.js'

/**
 * Load data from a CSV file to MongoDB.
 *
 * @param {string} filePath - The path to the CSV file.
 */
export const loadDataToMongo = async (filePath) => {
  if (await Pokemon.countDocuments() > 0) {
    console.log('The database is not empty. Aborting operation.')
    return
  }
  const records = []
  let count = 0

  // Read CSV file and parse its contents
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',' }))
    .on('data', (record) => {
      // Check if it's a valid record (not a header)
      if (!isNaN(record[0]) && record[1].endsWith('_0')) {
        // Map CSV columns to MongoDB document fields
        const doc = {
          number: parseInt(record[0]),
          name: record[2],
          generation: record[4],
          height: record[5],
          weight: record[6],
          type1: record[7],
          type2: record[8],
          color: record[12],
          category: record[22],
          hp: record[25],
          attack: record[26],
          defense: record[27],
          specialAttack: record[28],
          specialDefense: record[29],
          speed: record[30],
          total: record[31]
        }

        records.push(doc)
        count++
      }
    })
    .on('end', async () => {
      // Store the records in the database
      await Pokemon.insertMany(records)
      console.log(`Successfully stored ${count} records in the database.`)
    })
}
