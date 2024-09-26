export default defineEventHandler(async (event) => {
    try {
      // Fetch the JSON file with score data
      const data = await $fetch('https://berlnw.vercel.app/ber.json');
  
      let validPhoneNumber = '';
      let result = null;
  
      // Continue generating random phone numbers until the score sum is >= 40
      while (true) {
        // Generate a random 10-digit Thai phone number (starting with 0)
        validPhoneNumber = generateRandomThaiPhoneNumber();
        
        // Calculate the sum of the digits of the phone number
        const sum = sumOfDigits(validPhoneNumber);
        
        // Find the corresponding result in ber.json based on the sum
        result = data.results[sum];
        
        if (result) {
          // Calculate the total score
          const totalScore = result.score.luck + result.score.career + result.score.relationship + result.score.health + result.score.wealth;
  
          // If the total score is >= 40, return the phone number and result
          if (totalScore >= 40) {
            return {
              status: 'success',
              phoneNumber: validPhoneNumber,
              sum: sum,
              result,
              totalScore: totalScore
            };
          }
        }
      }
    } catch (error) {
      // Handle errors, such as JSON fetching issues
      return {
        status: 'error',
        message: 'Error fetching JSON file or generating phone number',
      };
    }
  });
  
  // Helper function to generate a random 10-digit Thai phone number
  function generateRandomThaiPhoneNumber() {
    const prefix = '0';
    const randomDigits = Math.random().toString().slice(2, 11); // Get 9 random digits
    return prefix + randomDigits;
  }
  
  // Helper function to calculate the sum of digits in the phone number
  function sumOfDigits(phoneNumber) {
    return phoneNumber.split('').reduce((acc, digit) => acc + Number(digit), 0);
  }