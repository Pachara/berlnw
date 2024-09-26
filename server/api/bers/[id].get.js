export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    // Fetch the JSON file from the correct path (it's served as a static file)
    const data = await $fetch('https://berlnw.vercel.app/ber.json');

    // Find the result by the sum (id)
    const result = data.results[id];

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
  } catch (error) {
    // Handle any fetch errors
    return {
      status: 'error',
      message: 'Error fetching JSON file',
    };
  }
});
