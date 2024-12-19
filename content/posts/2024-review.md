# 2024 in Review

The time moves so fast, it feels like it has been days since I wrote [2023 in review](/posts/2023-in-review), and the 2024 is wrapping up. It was a blast year, and in this article I will be touching upon the things I worked and learned this year.

## Hybrid Search
While search is a ubiquotous experience, the emergence of new AI technoligies like LLM can singnificantly elevate the experence if used [properly]().
Building a personalized search on a [valuable, custom dataset]() can be a huge win for the UX. 
I was part of the team that built a personalized, conversational chat experience for search.
We leveraged GPT 4o, CLIP Embeddings, Vercel's LLM-neutral AI SDK, and Clickhouse vector search and Rank Fusion algorithms while building the search.

An important problem during search is to combine item scores from multiple sources.
Although these scores can be numerical and might fall under same rank, they can not be arithmatically combined sice they have different meanings.
For example, a cosine distance of 0.5 between item text embedding and user query embedding, and, a Jaccard index of 0.5 between product keywords and query keywords have entirely different meaning.

A popular solution is to convert the result set into ranks, and combine them using a rank-fusion technique, which essentially converts each rank into scores which have the same meaning before combining them arithmatically. 
We had to carefully choose `row_number()` and `dense_rank()` SQL functions, then fuse ranks.

$$
\mathrm{score} = \sum_{i \in \mathrm{Rankset}} \frac{w_i}{b_i + \mathrm{rank}}
$$

For each rankset, we will derive a score as a reciprocal of a shifted rank, multiplied by a weight. This specific technique is known as [Reciprocal Rank Fusion]().
**Since we had all scores in the database, we could implement the search engine was a big SQL query with a handful of CTEs.** 
We just had to plug in image embedding input generated using [Xenova transformer]() to the query, along with the LLM-generated parameters.
You can read more about in a [dedicated article](/posts/hybrid-search) I wrote recently.

## DB Admin
This year, I was playing with few DBs helping self-hosting and managing them.

### Clickhouse
While we researched several databases to store vectors and other features for our search engine, we setteled with [Clickhouse](), since their vector search was fast ([even without the indices!]()) and they provide a familier, powerful SQL interface.

Self-hosting Clickhouse is easy, thanks to [Bitnami Helm Charts]().
While I was able to get a single node setup working flawlessly, I had to spend a lot of time getting distributed tables working until I found they have a dedicated [`create distributed table`]() DDL.
Lesson learnt -- Read the docs more!

An interesting observation with the Clickhouse is that they use [Zookeeper]() for distribution (now they suggest to prefer Keeper, a Zookeeper compatible service.)
Offloading the distribution a third party service is a common pattern for the application - for example to the Redis or Postrgres, maybe to have a distributed lock and cache.
It is nice to see a database doing it, on a natively distributed service.

### ScyllaDB
We had a MongoDB cluster that was primarily storing temporary user session tokens.
Due to some configuration and performance issues, we recently moved to ScyllaDB, a Cassandra-compatible wide table database that claims performance and cost gains over Cassandra.
While we started writing 

### Redis Cluster, Maybe?
We use Google-managed Redis (branded as Memory store) for many of our applications.
Unfortunately, they do not support extensions like Bll

## Rabbit Troubles

## Data Normalization using LLMs

## Tensor math in JS

## Moving fast, breaking things, and, fixing fast

## Askhara Tools