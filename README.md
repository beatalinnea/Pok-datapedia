# Pokédatapedia - Web for Data Science

## About

Pokédatapedia is an application that aims to provide an interactive visualization of Pokémon data - the data being visualized is based on each Pokémon individual stats, such as HP, Attack, Defense, Special Attack, Special Defense, and Speed, and then using algorithms and sorting to create visualizations over average stats for each Pokémon type and also clustering them into what is interpreted being weakest and strongest Pokémon.

- Dataset              
The dataset that I am using is avaialble [here](https://www.kaggle.com/datasets/takamasakato/pokemon-all-status-data).                     
The data is structured in a columnar format, with each column representing a specific attribute or characteristic of the Pokémon representing in both text and numerical data, such as name, type, height, weight, etc.          
Disclaimer: There are 1025 Pokémons in the Pokédex. The dataset I am using does not contain the last 15 Pokémon that are available in a certain expansion (The Indigo Disk). I chose to work with this dataset because I liked the structure of the data.            


- Clustering              
I am using KMeans Algorithm for clustering my Pokémon. Explained in more detail under Core Technologies. The KMeans algorithm can take in several parameters for sorting the Pokémon into the chosen amount of clusters - a K value. In the case of this application, this ended up being to sort each Pokémon in to a cluster depending on each Pokémons stat. The result was to end up with two clusters, which you can call the stronger and the weaker Pokémon.


- Visualization              
I wanted to create an interactive visualization over each Pokémon types average stats. My application also provides detailed information about each individual Pokémon available in the dataset. When choosing a Pokémon from a drop down list, it's stats and details will be shown together with an image of the Pokémon. The image is not being maintaned within my backend service, instead I pair the chosen id / Pokédex number and make a request towards the public [PokéAPI](https://pokeapi.co/) for fetching and viewing the correct image.               
The clusters are being visualized as well, showing each Pokémon as a scatter plot. The Pokémon are then sorted in to type and what cluster it belongs to. You can also choose to view and compare the average stats for each cluster.              
I wanted to be able to see what Pokémons ends up high in their stats in a better way than viewing it in a list. This way, you are able to see what Pokémon are in the top of the scatter plot and hoover over them to see it's name and Pokédex number. I am able to easily see which Pokémon have better stats. I am also able to see which type of Pokémon that have the lowest average stats. 

## Core Technologies
- Backend              
I am using Express.js as my backend framework. I choose this out of familiarity. I tried to challenge myself and really wanting to keep a good structure for handling non HTTP controller methods within a service folder to try and maintaint SOC.

- Data analysis and processing              
My dataset is being parsed and added to my MongoDB once the application is started. For processing my data I am using the js library [skmeans](www.npmjs.com/package/skmeans) - which is a tool used for data clustering. I was not familiar with this technique before this assignment but it sounded interesting to me when I was presented the idea. I've enjoyed learning more about this algorithm since I have not encountered it before. After deciding on 2 as my K value (explained in more details below) - skmeans will make several iterations when placing each Pokémon depending on their Hp, Attack, Defense, Special Attack, Special Defense and Speed in to the cluster where it's closest to the clusters centroid. The centroids represent the average of each cluster. The algorithm iterates until the cluster centroids (the mean of the points (pokémon) assigned to each cluster) no longer change significantly between iterations.

- Data Visualization              
I am using plotly.js library together with react ([react-plotly.js](https://plotly.com/javascript/react/)). I enjoyed working with this and choose it sinse it was a recommended option and also was suitable for combining with react.

- Frontend technology              
My frontend is built using React.js. When introduces to this assignment containing graphs and the interactiveness my initial thought was to use React.js since I thought it was suitable with the aim for components. 

- Deployment              
My backend service is deployed on cscloud [here](https://cscloud7-189.lnu.se/pokedata/api/v1) and my frontend application is available via netlify [here](https://pokedatapedia.netlify.app/). I wanted to use netlify to deploy my react application because the smoothness of the deploy.

## How to Use
- Type average              
The type graph is initally viewing a graph over each Pokémon types average total stats. You can interact with the graph by choosing a specific type from the drop down menu, to view all of the average stats for that specific type. You are then free to zoom in, zoom out, scale and hoover using the built-in tools within the plotly graph. ![imgtypes](/img/types.jpg)

- Clusters              
The first button is toggling a graph viewing detailed averaged stats for each cluster and total average stats for each cluster. The second button is replacing that graph with a scatter plot viewing each Pokémon as a dot. The y-axis is viewing the total stats of that Pokémon and the x-axis is divided in to clusters (C1 and C2) and type (their colors). 
Even here in all graphs / plots you are able to hoover to see details about the Pokémon and / or stats. ![imgcluster](/img/cluster.jpg)

- Pokémon Info              
Clicking "View Pokémon Info" will give you a drop down menu with all available Pokémon. When choosing one you will see the details for that Pokémon. You can close this view and toggle between Pokémons. ![imginfo](/img/info.jpg)

## Link to the Deployed Application

[Link to pokédatapedia](https://pokedatapedia.netlify.app/)

## Acknowledgements
Inspiration and helpful projects:
- Understanding KMeans and clustering                          
https://medium.com/@joaogabriellima/clustering-with-javascript-part-3-clustering-algorithms-in-practice-75631b241917
- Detailed project of Pokémons and KMeans algorithm            
https://www.kaggle.com/code/jbernardo/pokmeans-kmeans-clustering-in-pokedex
- Choosing my K-value for sorting Pokémons for the KMeans algorithm               
https://rpubs.com/ranggagemilang/reclustpokemon              
I wanted my clusters to be two, for sorting Pokémon to a weaker and stronger group since it was fundamentally helpful and accurate to me. Here is an example of how to find the optimal number of clusters with the Pokémon stats data. The author is using the Elbow method, silhouette method and gap statistics method. 2/3 of these methods would give you 2 as a suitable and optimal number for K (amount of clusters). I am using this as my source and reason for also choosing 2 as my K number.
