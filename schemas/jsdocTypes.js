/**
 Generated from HarperDB schema
 Manual changes will be lost!
 > harper dev .
 */
/**
 * @typedef {Object} cache_GraphQL
 * @property {string} id
 */

/** @typedef {Omit<cache_GraphQL, 'id'>} cache_NewGraphQL */
/** @typedef {cache_GraphQL} cache_GraphQLRecord */
/** @typedef {cache_GraphQL[]} cache_GraphQLRecords */
/** @typedef {Omit<cache_GraphQL, 'id'>} cache_NewGraphQLRecord */

/**
 * @typedef {Object} BlogCache
 * @property {string} id
 * @property {string} [content]
 */

/** @typedef {Omit<BlogCache, 'id'>} NewBlogCache */
/** @typedef {BlogCache} BlogCacheRecord */
/** @typedef {BlogCache[]} BlogCacheRecords */
/** @typedef {Omit<BlogCache, 'id'>} NewBlogCacheRecord */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} [slug]
 * @property {string} [title]
 * @property {string} [date]
 * @property {string} [category]
 * @property {string[]} [tags]
 * @property {string} [readTime]
 * @property {string} [excerpt]
 * @property {string} [content]
 */

/** @typedef {Omit<BlogPost, 'id'>} NewBlogPost */
/** @typedef {BlogPost} BlogPostRecord */
/** @typedef {BlogPost[]} BlogPostRecords */
/** @typedef {Omit<BlogPost, 'id'>} NewBlogPostRecord */

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {string} [createdAt]
 * @property {string} [title]
 * @property {string} [updatedAt]
 */

/** @typedef {Omit<Conversation, 'id'>} NewConversation */
/** @typedef {Conversation} ConversationRecord */
/** @typedef {Conversation[]} ConversationRecords */
/** @typedef {Omit<Conversation, 'id'>} NewConversationRecord */

/**
 * @typedef {Object} EmbeddingCache
 * @property {string} id
 * @property {number[]} [embedding]
 */

/** @typedef {Omit<EmbeddingCache, 'id'>} NewEmbeddingCache */
/** @typedef {EmbeddingCache} EmbeddingCacheRecord */
/** @typedef {EmbeddingCache[]} EmbeddingCacheRecords */
/** @typedef {Omit<EmbeddingCache, 'id'>} NewEmbeddingCacheRecord */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} [content]
 * @property {string} [conversationId]
 * @property {number} [cost]
 * @property {string} [createdAt]
 * @property {number[]} [embedding]
 * @property {string} [role]
 */

/** @typedef {Omit<Message, 'id'>} NewMessage */
/** @typedef {Message} MessageRecord */
/** @typedef {Message[]} MessageRecords */
/** @typedef {Omit<Message, 'id'>} NewMessageRecord */

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} [body]
 * @property {string[]} [comments]
 * @property {string} [title]
 */

/** @typedef {Omit<Post, 'id'>} NewPost */
/** @typedef {Post} PostRecord */
/** @typedef {Post[]} PostRecords */
/** @typedef {Omit<Post, 'id'>} NewPostRecord */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} [category]
 * @property {string} [description]
 * @property {string[]} [features]
 * @property {string} [image]
 * @property {string} [name]
 * @property {number} [price]
 * @property {Spec} [specs]
 */

/** @typedef {Omit<Product, 'id'>} NewProduct */
/** @typedef {Product} ProductRecord */
/** @typedef {Product[]} ProductRecords */
/** @typedef {Omit<Product, 'id'>} NewProductRecord */

/**
 * @typedef {Object} Stat
 * @property {string} id
 * @property {number} [cacheHits]
 * @property {number} [totalSaved]
 * @property {string} [updatedAt]
 */

/** @typedef {Omit<Stat, 'id'>} NewStat */
/** @typedef {Stat[]} Stats */
/** @typedef {Stat} StatRecord */
/** @typedef {Stat[]} StatRecords */
/** @typedef {Omit<Stat, 'id'>} NewStatRecord */

/**
 * @typedef {Object} TableName
 * @property {string} id
 * @property {string} [name]
 * @property {string} [tag]
 */

/** @typedef {Omit<TableName, 'id'>} NewTableName */
/** @typedef {TableName} TableNameRecord */
/** @typedef {TableName[]} TableNameRecords */
/** @typedef {Omit<TableName, 'id'>} NewTableNameRecord */

/**
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} [category]
 * @property {string} [name]
 */

/** @typedef {Omit<Topic, 'id'>} NewTopic */
/** @typedef {Topic} TopicRecord */
/** @typedef {Topic[]} TopicRecords */
/** @typedef {Omit<Topic, 'id'>} NewTopicRecord */

/**
 * @typedef {Object} Trait
 * @property {string} id
 * @property {string[]} [traits]
 */

/** @typedef {Omit<Trait, 'id'>} NewTrait */
/** @typedef {Trait[]} Traits */
/** @typedef {Trait} TraitRecord */
/** @typedef {Trait[]} TraitRecords */
/** @typedef {Omit<Trait, 'id'>} NewTraitRecord */

/**
 * @typedef {Object} demo_Breed
 * @property {string} name
 * @property {number} [barking]
 * @property {number} [coat_length]
 * @property {number} [drooling]
 * @property {number} [energy]
 * @property {number} [good_with_children]
 * @property {number} [good_with_other_dogs]
 * @property {number} [good_with_strangers]
 * @property {number} [grooming]
 * @property {string} [image_link]
 * @property {number} [max_height_female]
 * @property {number} [max_height_male]
 * @property {number} [max_life_expectancy]
 * @property {number} [max_weight_female]
 * @property {number} [max_weight_male]
 * @property {number} [min_height_female]
 * @property {number} [min_height_male]
 * @property {number} [min_life_expectancy]
 * @property {number} [min_weight_female]
 * @property {number} [min_weight_male]
 * @property {number} [playfulness]
 * @property {number} [protectiveness]
 * @property {number} [shedding]
 * @property {number} [trainability]
 */

/** @typedef {Omit<demo_Breed, 'name'>} demo_NewBreed */
/** @typedef {demo_Breed} demo_BreedRecord */
/** @typedef {demo_Breed[]} demo_BreedRecords */
/** @typedef {Omit<demo_Breed, 'name'>} demo_NewBreedRecord */

/**
 * @typedef {Object} demo_Dog
 * @property {number} id
 * @property {string} breedName
 * @property {string} [dob]
 * @property {string} [name]
 */

/** @typedef {Omit<demo_Dog, 'id'>} demo_NewDog */
/** @typedef {demo_Dog} demo_DogRecord */
/** @typedef {demo_Dog[]} demo_DogRecords */
/** @typedef {Omit<demo_Dog, 'id'>} demo_NewDogRecord */

/**
 * @typedef {Object} harperfast_nextjs_nextjs_build_info
 * @property {string} appName
 * @property {string} [buildId]
 * @property {string} [status]
 */

/** @typedef {Omit<harperfast_nextjs_nextjs_build_info, 'appName'>} harperfast_nextjs_Newnextjs_build_info */
/** @typedef {harperfast_nextjs_nextjs_build_info} harperfast_nextjs_nextjs_build_infoRecord */
/** @typedef {harperfast_nextjs_nextjs_build_info[]} harperfast_nextjs_nextjs_build_infoRecords */
/** @typedef {Omit<harperfast_nextjs_nextjs_build_info, 'appName'>} harperfast_nextjs_Newnextjs_build_infoRecord */

/**
 * @typedef {Object} harperfast_nextjs_nextjs_isr_cache
 * @property {string} id
 * @property {string} [data]
 * @property {number} [lastModified]
 */

/** @typedef {Omit<harperfast_nextjs_nextjs_isr_cache, 'id'>} harperfast_nextjs_Newnextjs_isr_cache */
/** @typedef {harperfast_nextjs_nextjs_isr_cache} harperfast_nextjs_nextjs_isr_cacheRecord */
/** @typedef {harperfast_nextjs_nextjs_isr_cache[]} harperfast_nextjs_nextjs_isr_cacheRecords */
/** @typedef {Omit<harperfast_nextjs_nextjs_isr_cache, 'id'>} harperfast_nextjs_Newnextjs_isr_cacheRecord */
