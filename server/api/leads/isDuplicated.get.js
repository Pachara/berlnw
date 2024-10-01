// Import the necessary modules
import db from '~/drizzle.config.js';  // Your database connection
import { leadsTable } from '~/drizzle.config.js'; // Import the leads table schema
import { eq } from 'drizzle-orm';

// Define the API handler
export default defineEventHandler(async (event) => {
  // Extract the phone number from query parameters
  const query = getQuery(event);
  const { phone_number } = query;

  // Check if the phone_number is provided
  if (!phone_number) {
    return {
      statusCode: 400,
      body: {
        message: 'Phone number is required',
      },
    };
  }

  try {
    // Query the database to check if the phone number exists
    const existingLead = await db
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.phone_number, phone_number))
      .limit(1);

    // If the phone number exists, return a response indicating duplication
    if (existingLead.length > 0) {
      return {
        statusCode: 200,
        body: {
          isDuplicated: true,
          message: 'Phone number already exists',
        },
      };
    }

    // If the phone number does not exist, return a response indicating no duplication
    return {
      statusCode: 200,
      body: {
        isDuplicated: false,
        message: 'Phone number is available',
      },
    };
  } catch (error) {
    // Handle any errors that occur during the process
    return {
      statusCode: 500,
      body: {
        message: 'An error occurred while checking the phone number',
        error: error.message,
      },
    };
  }
});
