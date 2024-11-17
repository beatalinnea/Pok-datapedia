/**
 * Using the data, this service is using KMeans algorithm to cluster the data.
 */
import skmeans from 'skmeans'

/**
 * Represents a data handler.
 */
export class DataHandler {
  /**
   * Clusters the data using KMeans algorithm.
   *
   * @param {Array} data - The data to cluster.
   * @param {number} k - The number of clusters.
   * @returns {object} The clustered data.
   */
  clusterData (data, k) {
    const res = skmeans(data.map(p => p.stats), k)
    for (let i = 0; i < data.length; i++) {
      data[i].cluster = res.idxs[i] + 1
    }

    // Initialize clusters object
    const clusters = {}

    // Populate clusters object with data points
    for (let i = 0; i < k; i++) {
      clusters[`cluster${i + 1}`] = data.filter(p => p.cluster === i + 1)
    }

    // Add clusters to the result object
    res.clusters = clusters

    return res
  }

  /**
   * Calculates the total of the clusters.
   *
   * @param {Array} data - The data to calculate the total of.
   * @param {number} k - The number of clusters.
   * @returns {object} The total of the clusters.
   */
  calcCentroidsOfClusters (data, k) {
    const res = skmeans(data.map(p => p.stats), k)
    const clusters = {}

    for (let i = 0; i < k; i++) {
      const cluster = {}
      const centroid = res.centroids[i]

      cluster.hp = centroid[0]
      cluster.attack = centroid[1]
      cluster.defense = centroid[2]
      cluster.specialAttack = centroid[3]
      cluster.specialDefense = centroid[4]
      cluster.speed = centroid[5]
      cluster.total = centroid[0] + centroid[1] + centroid[2] + centroid[3] + centroid[4] + centroid[5]

      clusters[`cluster${i + 1}`] = cluster
    }

    return clusters
  }

  /**
   * Calculates the average of the data.
   *
   * @param {Array} data - The data to calculate the average of.
   * @returns {object} The average of the data.
   */
  calcAverage (data) {
    const average = {}

    const hp = data.map(p => p.hp)
    const attack = data.map(p => p.attack)
    const defense = data.map(p => p.defense)
    const specialAttack = data.map(p => p.specialAttack)
    const specialDefense = data.map(p => p.specialDefense)
    const speed = data.map(p => p.speed)
    const total = data.map(p => p.total)

    average.hp = hp.reduce((a, b) => a + b, 0) / hp.length
    average.attack = attack.reduce((a, b) => a + b, 0) / attack.length
    average.defense = defense.reduce((a, b) => a + b, 0) / defense.length
    average.specialAttack = specialAttack.reduce((a, b) => a + b, 0) / specialAttack.length
    average.specialDefense = specialDefense.reduce((a, b) => a + b, 0) / specialDefense.length
    average.speed = speed.reduce((a, b) => a + b, 0) / speed.length
    average.total = total.reduce((a, b) => a + b, 0) / total.length

    return average
  }
}
