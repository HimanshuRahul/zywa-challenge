// function blackBoxAPI(input) {
// 	// Ensure the input is valid
// 	if (!Array.isArray(input) || input.length !== 3) {
// 		throw new Error("Input must be an array of exactly three numbers.");
// 	}

// 	// Check if all numbers in the input are the same
// 	const allSame = input[0] === input[1] && input[1] === input[2];

// 	// Initialize the result array
// 	const result = [];

// 	// Calculate the first output number
// 	let firstOutput;
// 	if (allSame) {
// 		firstOutput = input[0] + input[1] - 2;
// 	} else {
// 		firstOutput = input[0] + input[1] + input[2];
// 	}
// 	result.push(firstOutput);

// 	// Calculate the second output number
// 	let secondOutput = firstOutput + 1;
// 	result.push(secondOutput);

// 	// Calculate the third output number
// 	let thirdOutput;
// 	if (allSame) {
// 		thirdOutput = secondOutput - 2;
// 	} else {
// 		thirdOutput = secondOutput + 1;
// 	}
// 	result.push(thirdOutput);

// 	// Return the result array
// 	return result;
// }

// function blackBoxAPI(input) {
// 	// Ensure the input is valid
// 	if (!Array.isArray(input) || input.length !== 3) {
// 		throw new Error("Input must be an array of exactly three numbers.");
// 	}

// 	// Check if all numbers in the input are the same
// 	const allSame = input[0] === input[1] && input[1] === input[2];

// 	// Initialize the result array
// 	const result = [];

// 	// Calculate the first output number
// 	let firstOutput;
// 	if (allSame) {
// 		firstOutput = input[0] + input[1] - 2; // Case: all numbers same
// 	} else {
// 		firstOutput = input[0] + input[1] + input[2]; // Case: numbers differ
// 	}
// 	result.push(firstOutput);

// 	// Calculate the second output number
// 	const secondOutput = firstOutput + 1;
// 	result.push(secondOutput);

// 	// Calculate the third output number
// 	let thirdOutput;
// 	if (allSame) {
// 		thirdOutput = secondOutput - 2; // Case: all numbers same
// 	} else {
// 		thirdOutput = secondOutput + 1; // Case: numbers differ
// 	}
// 	result.push(thirdOutput);

// 	// Return the result array
// 	return result;
// }

// function blackBoxAPI(input) {
// 	// Ensure the input is valid
// 	if (!Array.isArray(input) || input.length !== 3) {
// 		throw new Error("Input must be an array of exactly three numbers.");
// 	}

// 	// Check if all numbers in the input are the same
// 	const allSame = input[0] === input[1] && input[1] === input[2];

// 	// Initialize the result array
// 	const result = [];

// 	// Calculate the first output number
// 	let firstOutput;
// 	if (allSame) {
// 		firstOutput = input[0] + input[1] - 2;
// 	} else {
// 		firstOutput = input[0] + input[1] + input[2] - 3;
// 	}
// 	result.push(firstOutput);

// 	// Calculate the second output number
// 	const secondOutput = firstOutput + 1;
// 	result.push(secondOutput);

// 	// Calculate the third output number
// 	let thirdOutput;
// 	if (allSame) {
// 		thirdOutput = secondOutput - 2;
// 	} else {
// 		thirdOutput = secondOutput + 1;
// 	}
// 	result.push(thirdOutput);

// 	// Return the result array
// 	return result;
// }

// function blackBoxAPI(input) {
// 	// Define the offset pattern derived from the analysis
// 	const offsets = [3, 4, 2]; // Observed offsets for respective indices

// 	// Calculate the output
// 	return input.map((num, index) => num + offsets[index % offsets.length]);
// }

// function blackBoxAPI(arr) {
// 	// Check if all numbers in array are same
// 	const allSame = arr.every((num) => num === arr[0]);

// 	if (allSame) {
// 		return [arr[0] + 3, arr[0] + 4, arr[0] + 2];
// 	} else {
// 		// For different numbers
// 		const min = Math.min(...arr);
// 		const max = Math.max(...arr);

// 		// Calculate the average difference needed to transform
// 		let sum = 0;
// 		for (let i = 0; i < arr.length; i++) {
// 			// Find how far each number is from the minimum
// 			let distanceFromMin = arr[i] - min;
// 			// Use this to influence the transformation
// 			sum += distanceFromMin;
// 		}

// 		// Use the sum to determine base transformation
// 		let baseTransform = 5;
// 		if (sum > 3) {
// 			// If numbers have bigger gaps
// 			baseTransform = 5;
// 		}

// 		// Transform each number while maintaining relative order
// 		return arr.map((num, index) => {
// 			if (index === arr.length - 1 && sum > 3) {
// 				return num + baseTransform - 1; // Adjust last number if gaps are big
// 			}
// 			return num + baseTransform;
// 		});
// 	}
// }

function blackBoxAPI(arr) {
	// Step 1: Check if all numbers in the array are the same
	let allNumbersSame = true;
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] !== arr[0]) {
			allNumbersSame = false;
			break;
		}
	}

	// Step 2: Handle the case where all numbers are the same
	if (allNumbersSame) {
		return [arr[0] + 3, arr[0] + 4, arr[0] + 2];
	}

	// Step 3: Handle the case where numbers are different
	const minValue = Math.min(...arr);

	// Calculate the sum of differences from the minimum value
	let sumOfDifferences = 0;
	for (let i = 0; i < arr.length; i++) {
		const differenceFromMin = arr[i] - minValue;
		sumOfDifferences += differenceFromMin;
	}

	// Determine the base transformation value
	let baseTransformation = 5;
	if (sumOfDifferences > 3) {
		baseTransformation = 5;
	}

	// Transform each number in the array
	const transformedArray = [];
	for (let i = 0; i < arr.length; i++) {
		let transformedValue = arr[i] + baseTransformation;

		// Adjust the last element if gaps are large
		if (i === arr.length - 1 && sumOfDifferences > 3) {
			transformedValue -= 1;
		}

		transformedArray.push(transformedValue);
	}

	return transformedArray;
}

console.log(blackBoxAPI([1, 2, 3])); // [6, 7, 8]
console.log(blackBoxAPI([5, 5, 5])); // [8, 9, 7]
console.log(blackBoxAPI([2, 3, 5])); // [7, 8, 9]
console.log(blackBoxAPI([1, 1, 1])); // [4, 5, 3]

// Additional Test Cases
console.log(blackBoxAPI([4, 6, 7])); // [9, 11, 11]
console.log(blackBoxAPI([3, 3, 3])); // [6, 7, 5]
console.log(blackBoxAPI([0, 2, 4])); // [5, 7, 8]
