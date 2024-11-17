## Pokémon filtering API

### Parsing CSV file and storing in MongoDB
Once, when the backend is being deployed, the CSV file containing the Pokémon data will be parsed and cleaned and the wanted values will be stored in MongoDB.
The values that are stored and available are for each of the 1010 Pokémon are:
* Number (Pokédex id)
* Name
* Generation (When introduced)
* Height
* Weight
* Type 1
* Type 2 (If present)
* Color
* Category
* HP
* Attack
* Defense
* Special Attack
* Special Defense
* Speed
* Total

### KMeans algorithm - clustering data
The purpose of using KMeans algorithm is:
- Random Select of the initial centroids;
- Each object (row of the data set) is assigned to the group whose centroid has the greatest similarity to the object;
- Recalculate the centroid value of each group, as the average of the objects in the group;
- (Repeat steps 2 and 3 until the groups stabilize or a stop condition set in the algorithm is reached.)
https://medium.com/@joaogabriellima/clustering-with-javascript-part-3-clustering-algorithms-in-practice-75631b241917

### Disclaimer
The dataset I've chosen to work with contains 1010 Pokémon. There are 1025. The 15 last ones missing must have escaped their Poké Ball.