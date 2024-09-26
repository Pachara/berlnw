export default defineEventHandler(async (event) => {
  // Get the `id` parameter from the URL (this is the sum passed to the API)
  const { id } = event.context.params;

  // Fetch the JSON file from the public directory
  const data = await $fetch('/ber.json');

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
