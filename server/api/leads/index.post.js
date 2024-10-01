import db, { leadsTable } from '~/drizzle.config.js'; // Import the db instance and leadsTable from your config file

export default defineEventHandler(async (event) => {
  // Parse request body to get the lead data
  const body = await readBody(event);



  // Destructure the necessary fields from the body
  const { phone_number } = body;

  // Validate the required fields
  if (!phone_number) {
    throw createError({
      statusCode: 400,
      message: 'Phone number is required.',
    });
  }

  // Insert the new lead into the leads table
  try {
    // Insert the lead data into the leads table using the db instance
    const result = await db
      .insert(leadsTable)
      .values({
        phone_number,
        created_at: new Date(), // Automatically set created_at to the current date/time
      })
      .returning(); // Return the inserted data

    // Return the inserted lead data as a response
    return {
      success: true,
      data: result[0], // Returning the first inserted row
    };
  } catch (error) {
    // Catch any errors during insertion and return a 500 status code
    throw createError({
      statusCode: 500,
      message: 'Failed to insert lead.',
    });
  }
});
