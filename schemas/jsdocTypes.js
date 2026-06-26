/**
 Generated from HarperDB schema
 Manual changes will be lost!
 > harper dev .
 */
/**
 * @typedef {Object} cron_CronJob
 * @property {any} jobId
 * @property {string} [lastRunTime]
 * @property {string} [nextRunTime]
 * @property {string} [schedule]
 * @property {string} [status]
 */

/** @typedef {Omit<cron_CronJob, 'jobId'>} cron_NewCronJob */
/** @typedef {cron_CronJob} cron_CronJobRecord */
/** @typedef {cron_CronJob[]} cron_CronJobRecords */
/** @typedef {Omit<cron_CronJob, 'jobId'>} cron_NewCronJobRecord */

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
 * @typedef {Object} Document
 * @property {string} id
 * @property {string} [body]
 * @property {number[]} [embedding]
 * @property {string} [title]
 */

/** @typedef {Omit<Document, 'id'>} NewDocument */
/** @typedef {Document} DocumentRecord */
/** @typedef {Document[]} DocumentRecords */
/** @typedef {Omit<Document, 'id'>} NewDocumentRecord */

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
