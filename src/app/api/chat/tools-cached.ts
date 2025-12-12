// Cached versions of tools to reduce API calls
import { tool } from 'ai';
import { z } from 'zod';
import { toolCache, createToolCacheKey } from './cache-utils';
import * as originalTools from './tools/getContact';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getInternship';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSports';
import { getWeather } from './tools/getWeather';

// Wrapper function to add caching to any tool
function createCachedTool<TParams extends z.ZodTypeAny>(
  toolName: string,
  originalTool: any,
  ttlMinutes: number = 30
) {
  return tool({
    description: originalTool.description,
    parameters: originalTool.parameters,
    execute: async (params: any) => {
      const cacheKey = createToolCacheKey(toolName, params);

      // Check cache first
      const cached = toolCache.get(cacheKey);
      if (cached !== undefined) {
        console.log(`[CACHE HIT] ${toolName}`);
        return cached;
      }

      // Cache miss - execute original tool
      console.log(`[CACHE MISS] ${toolName}`);
      const result = await originalTool.execute(params);

      // Store in cache
      toolCache.set(cacheKey, result, { ttl: 1000 * 60 * ttlMinutes });

      return result;
    },
  });
}

// Export cached versions of all tools
// These tools return static data, so they're perfect for aggressive caching
export const getProjectsCached = createCachedTool('getProjects', getProjects, 60); // 1 hour
export const getPresentationCached = createCachedTool('getPresentation', getPresentation, 60); // 1 hour
export const getResumeCached = createCachedTool('getResume', getResume, 60); // 1 hour
export const getContactCached = createCachedTool('getContact', getContact, 120); // 2 hours
export const getSkillsCached = createCachedTool('getSkills', getSkills, 60); // 1 hour
export const getSportsCached = createCachedTool('getSports', getSports, 60); // 1 hour
export const getCrazyCached = createCachedTool('getCrazy', getCrazy, 60); // 1 hour
export const getInternshipCached = createCachedTool('getInternship', getInternship, 30); // 30 minutes
export const getWeatherCached = createCachedTool('getWeather', getWeather, 5); // 5 minutes (weather changes)
