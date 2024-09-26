import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler((event) => {
  // Get the `id` parameter from the URL (this is the sum passed to the API)
  const { id } = event.context.params;

  // Path to the ber.json file
  const filePath = join(process.cwd(), 'assets', 'ber.json');

  // Read and parse the JSON file
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  // Find the result by the sum (id)
  const result = data.results[id];

  // If result is found, return it, else return a 404 error
  if (result) {
    return {
      status: 'success',
      result
    };
  } else {
    return {
      status: 'error',
      message: `Result not found for sum: ${id}`
    };
  }
});
