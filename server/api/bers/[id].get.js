import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler((event) => {
  // Get the `id` parameter from the URL (this is the sum passed to the API)
  const { id } = event.context.params;

  // Path to the ber.json file in the public folder
  const filePath = join(process.cwd(), 'public', 'ber.json');

  // Read and parse the JSON file
  let data;
  try {
    data = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (error) {
    // If file is not found or there's an issue reading it, return an error
    return {
      status: 'error',
      message: 'Error reading JSON file',
    };
  }

  // Find the result by the sum (id)
  const result = data.results[id];

  // If result is found, return it, else return a 404 error
  if (result) {
    return {
      status: 'success',
      result,
    };
  } else {
    return {
      status: 'error',
      message: `Result not found for sum: ${id}`,
    };
  }
});
