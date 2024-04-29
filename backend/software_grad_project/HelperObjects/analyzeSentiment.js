// const { spawn } = require("child_process");

// // Function to analyze sentiment using Python script
// const analyzeSentiment = (sentence) => {
//   return new Promise((resolve, reject) => {
//     const pythonProcess = spawn("python", ["sentiment-analysis.py"]);

//     // Send sentence to Python script
//     pythonProcess.stdin.write(sentence + "\n");
//     pythonProcess.stdin.end();

//     let data = "";

//     // Receive result from Python script
//     pythonProcess.stdout.on("data", (chunk) => {
//       data += chunk.toString();
//     });

//     // Handle errors
//     pythonProcess.stderr.on("data", (err) => {
//       reject(err.toString());
//     });

//     // Handle completion
//     pythonProcess.on("close", (code) => {
//       if (code === 0) {
//         resolve(JSON.parse(data));
//       } else {
//         reject(`Python script exited with code ${code}`);
//       }
//     });
//   });
// };

const analyzeSentiment = (sentence) => {
  return {
    neg: 0.007541361730545759,
    neu: 0.28206339478492737,
    pos: 0.7103952169418335,
  };
}

module.exports = {
  analyzeSentiment,
};

// // Example usage
// const exampleSentence =
//   "Those paper towels bc they are durable and fairly priced, in comparison to other brands."; // text of feedback

// async function analyze() {
//   try {
//     const result = await analyzeSentiment(exampleSentence);
//     //here you add result.neg, result.pos, result.neu to database
//     // result is gonna be like this:
//     // {
//     //   neg: 0.007541361730545759,
//     //   neu: 0.28206339478492737,
//     //   pos: 0.7103952169418335
//     // }
//     console.log(result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// analyze();
