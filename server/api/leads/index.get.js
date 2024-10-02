import db, { leadsTable } from '~/drizzle.config.js';

export default defineEventHandler(async (event) => {
  try {
    // Correct query execution with Neon + Drizzle
    const leads = await db.select().from(leadsTable).execute(); // Use execute() instead of all()

    // Return the leads data as a response
    return {
      success: true,
      data: leads,
    };
  } catch (error) {
    // Log the actual error details for better debugging
    console.error('Error fetching leads:', error);
    
    // Throw a more detailed error message for debugging purposes
    throw createError({
      statusCode: 500,
      message: `Failed to fetch leads. Error: ${error.message}`,
    });
  }
});
