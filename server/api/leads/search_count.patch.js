import db from '~/drizzle.config.js'; // Import the database connection
import { leadsTable } from '~/drizzle.config.js'; // Import the leads table schema
import { eq } from 'drizzle-orm';

// Define the API handler for PATCH request
export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read the request body
  const { phone_number } = body; // Get the phone number from the request body

  // Check if the phone number is provided
  if (!phone_number) {
    return {
      statusCode: 400,
      body: { message: 'Phone number is required' },
    };
  }

  try {
    // Fetch the current search_count for the given phone_number
    const existingLead = await db
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.phone_number, phone_number))
      .limit(1);

    // If the lead is not found, return an error
    if (existingLead.length === 0) {
      return {
        statusCode: 404,
        body: { message: 'Lead not found' },
      };
    }

    // Get the current search_count
    const currentSearchCount = existingLead[0].search_count;

    // Increment the search_count by 1
    const updatedLead = await db
      .update(leadsTable)
      .set({ search_count: currentSearchCount + 1 }) // Increment search_count
      .where(eq(leadsTable.phone_number, phone_number))
      .returning(); // Return the updated lead

    // Return the updated record
    return {
      statusCode: 200,
      body: {
        message: 'Search count updated successfully',
        data: updatedLead[0],
      },
    };
  } catch (error) {
    // Handle any errors during the update process
    return {
      statusCode: 500,
      body: { message: 'Error updating search count', error: error.message },
    };
  }
});
