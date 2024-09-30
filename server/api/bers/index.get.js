export default defineEventHandler(async (event) => {
    try {
      // Fetch the JSON file from the correct path (it's served as a static file)
      const data = await $fetch('https://berlnw.vercel.app/ber.json');
  
      // Assuming the data contains an array of results, return all results
      return {
        status: 'success',
        results: data.results,
      };
    } catch (error) {
      // Handle any fetch errors
      return {
        status: 'error',
        message: 'Error fetching JSON file',
      };
    }
  });
  