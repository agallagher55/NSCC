const fs = require("fs");

const data = fs.readFileSync("the_choices_file.csv", "utf-8");
const dataLines = data.split("\r\n");

const alphaChoices = ["A", "B", "C", "D", "E"];
let userChoices = Array();

// GET USER DATA

// Read all questions with all answers
for (line of dataLines) {
  let lineOptions = line.split(",");

  let question = lineOptions[0];
  let choices = lineOptions.slice(1); // Second element to end
  let validAnswer = false;

  console.log(`\nPlease choose ${question}:`);

  while (!validAnswer) {
    // Iterate over choices
    for (let i = 0; i < choices.length; i++) {
      let message = `${alphaChoices[i]}) ${choices[i]}`;
      console.log(`${message}`);
    }
    console.log("Enter choice (A-E): ");

    // Get answer from user
    const alphaAnswerIndex = Math.floor(Math.random() * alphaChoices.length); // Change value to >5 to test for false condition
    const alphaAnswer = alphaChoices[alphaAnswerIndex];

    // Match Alpha answer to line option
    const indexAlpha = alphaChoices.indexOf(alphaAnswer);
    const userChoice = choices[indexAlpha];

    // *Check answer is valid.
    if (choices.includes(userChoice)) {
      validAnswer = true;

      // Convert userChoice to uppercase and save variable of all user answers
      userChoices.push(userChoice.toUpperCase());
    }
  }
}

console.log(`\nUser Answers:\n${userChoices.join(", ")}`);

// ADD USER DATA TO STORY

// Read the_story_file.txt
let story = fs.readFileSync("the_story_file.txt", "utf-8");

// Split story into parts, splitting on underscores to isolate integers for replacing
let splitStory = story.split("_");

// Search parts of story for integers to replace
for (let i = 0; i < splitStory.length; i++) {
  let part = splitStory[i];
  // console.log(`\nChecking story part '${part}' for an integer...`);

  let storyNum = parseInt(part);
  if (!Number.isNaN(storyNum)) {
    // If integer is found, replace storyPart with userChoice[Integer - 1]
    let userChoice = userChoices[storyNum - 1]; // Story numbers start with one, userChoices is zero-index based array
    splitStory[i] = userChoice;
    // console.log(`Replacing '${storyNum}' with '${userChoice}...'`);
  }
  // Remove any trailing spaces from story part --> will join parts together with a space next.
  splitStory[i] = splitStory[i].trim();
}

// Re-join story
let reJoinedStory = splitStory.join(" "); // Re-join story parts, connecting each part with a space
reJoinedStory = reJoinedStory.replace("  ", " "); // Remove double space that results from two _#_ being next to each other

// Print results
console.log("\nYour Completed Story:");
console.log(reJoinedStory);

// Other options
// Create mapping between _#_ and user answers
