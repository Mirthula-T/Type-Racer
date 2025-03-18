 // Selecting required HTML elements
let timerElement = document.getElementById("timer"); // Timer display
let quoteInput = document.getElementById("quote-input"); // User input field
let startButton = document.getElementById("start-test"); // Start button
let stopButton = document.getElementById("stop-test"); // Stop button
let accuracyElement = document.getElementById("acc"); // Accuracy display
let wpmElement = document.getElementById("wpm"); // Words per minute display
let resultContainer = document.querySelector(".result"); // Result container

// Define the passage text directly in JavaScript
let passageText = "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.";

document.getElementById("passage-text").innerText = passageText; // Set passage in HTML

// Variables to track time and test state
let startTime, interval, testRunning = false;

/**
 * Function to start the typing test
 * - Resets input and timer
 * - Enables the input field
 * - Starts the timer
 */
function startTest() {
    if (testRunning) return; // Prevents restarting while already running
    testRunning = true; // Mark test as running

    // Reset UI elements
    startButton.style.display = "none"; // Hide start button
    stopButton.style.display = "inline-block"; // Show stop button
    quoteInput.disabled = false; // Enable input field
    quoteInput.value = ""; // Clear previous input
    quoteInput.focus(); // Focus cursor on input field
    resultContainer.style.display = "none"; // Hide previous result

    // Initialize the timer
    startTime = new Date().getTime();
    timerElement.innerText = "0s"; // Reset timer display

    // Timer function updates every second
    interval = setInterval(() => {
        let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        timerElement.innerText = `${elapsedTime}s`; // Update timer display
    }, 1000);
}

/**
 * Function to stop the typing test
 * - Stops the timer
 * - Disables input field
 * - Calculates accuracy and speed
 * - Displays results
 */
function stopTest() {
    if (!testRunning) return; // Prevents stopping when not running
    testRunning = true; // Mark test as stopped

    // Stop the timer
    clearInterval(interval);

    // Disable input field and reset buttons
    stopButton.style.display = "none"; // Hide stop button
    startButton.style.display = "inline-block"; // Show start button
    quoteInput.disabled = true; // Disable input field

    // Retrieve the user's typed text
    let typedText = quoteInput.value.trim();
    let passageChars = passageText.split(""); // Convert passage into array of characters
    let typedChars = typedText.split(""); // Convert typed input into array of characters

    // Calculate the number of correct characters typed
    let correctChars = 0;
    for (let i = 0; i < Math.min(typedChars.length, passageChars.length); i++) {
        if (typedChars[i] === passageChars[i]) {
            correctChars++; // Count correct characters
        }
    }

    // Calculate accuracy percentage
    let accuracy = typedChars.length > 0 ? (correctChars / typedChars.length) * 100 : 0;

    // Calculate time taken in minutes correctly
    let timeTaken = (new Date().getTime() - startTime) / 60000; // Convert ms to minutes

    // Prevent division by zero when calculating WPM
    let wordCount = typedText.split(" ").filter(word => word.length > 0).length;
    let wpm = timeTaken > 0 ? Math.floor(wordCount / timeTaken) : 0;

    // Display results
    accuracyElement.innerText = accuracy.toFixed(2) + "%"; // Show accuracy
    wpmElement.innerText = wpm + " WPM"; // Show words per minute
    resultContainer.style.display = "block"; // Show result container
}
