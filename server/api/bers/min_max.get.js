import { readFileSync } from 'fs';
import { join } from 'path';

export default defineEventHandler((event) => {
  // Path to the ber.json file
  const filePath = join(process.cwd(), 'assets', 'ber.json');

  // Read and parse the JSON file
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  // Variables to track the min and max scores and their corresponding keys
  let minSum = Infinity;
  let maxSum = -Infinity;
  let minSumKey = null;
  let maxSumKey = null;

  // Iterate through each result in the data
  for (const key in data.results) {
    const scores = data.results[key].score;
    const totalScore = scores.luck + scores.career + scores.relationship + scores.health + scores.wealth;

    // Track min score
    if (totalScore < minSum) {
      minSum = totalScore;
      minSumKey = key;
    }

    // Track max score
    if (totalScore > maxSum) {
      maxSum = totalScore;
      maxSumKey = key;
    }
  }

  // Return the min and max scores along with their corresponding keys
  return {
    status: 'success',
    min: {
      sum: minSum,
      key: minSumKey
    },
    max: {
      sum: maxSum,
      key: maxSumKey
    }
  };
});
