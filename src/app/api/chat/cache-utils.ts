// Cache utilities for AI chat responses
import { LRUCache } from 'lru-cache';

// Types for cached data
export interface CachedChatResponse {
  content: string;
  toolCalls?: any[];
  timestamp: number;
}

// Initialize LRU cache for tool results (faster than full responses)
// Tools like getProjects, getSkills return static data - perfect for caching
export const toolCache = new LRUCache<string, any>({
  max: 50, // Cache up to 50 tool results
  ttl: 1000 * 60 * 30, // 30 minutes TTL (longer since tools return static data)
  updateAgeOnGet: true,
  updateAgeOnHas: false,
});

// Cache for common query patterns
// This caches the entire response for frequently asked questions
export const queryCache = new LRUCache<string, CachedChatResponse>({
  max: 100, // Cache up to 100 common queries
  ttl: 1000 * 60 * 15, // 15 minutes TTL
  updateAgeOnGet: true,
  updateAgeOnHas: false,
});

// Create a normalized cache key from user query
export function createQueryCacheKey(query: string): string {
  // Normalize the query: lowercase, trim, remove extra spaces
  const normalized = query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, ''); // Remove punctuation

  return `query:${normalized}`;
}

// Create cache key for tool calls
export function createToolCacheKey(toolName: string, params: any = {}): string {
  const paramsStr = Object.keys(params).length > 0
    ? JSON.stringify(params)
    : 'no-params';
  return `tool:${toolName}:${paramsStr}`;
}

// Check if a query matches common cacheable patterns
export function isCacheableQuery(query: string): boolean {
  const normalized = query.toLowerCase().trim();

  // Common patterns that should be cached
  const cacheablePatterns = [
    /who are you/i,
    /tell me about (you|yourself)/i,
    /what are your (projects|skills)/i,
    /show me your (resume|portfolio)/i,
    /what did you (build|work on)/i,
    /your (experience|work)/i,
    /contact (info|information)/i,
    /how can i (reach|contact) you/i,
    /are you looking for/i,
    /what sports/i,
    /craziest thing/i,
  ];

  return cacheablePatterns.some(pattern => pattern.test(normalized));
}

// Log cache statistics
export function getCacheStats() {
  return {
    queryCache: {
      size: queryCache.size,
      max: queryCache.max,
      hitRate: queryCache.size > 0 ? 'tracking' : 'no data',
    },
    toolCache: {
      size: toolCache.size,
      max: toolCache.max,
    },
  };
}
