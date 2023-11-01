import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the current file and directory paths.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the JSON data file.
const dataFilePath = path.join(__dirname, '..', 'pets.json');

// Function to display usage instructions and exit.
function displayUsageAndExit(subcommand) {
    if (subcommand === 'read') {
      console.error('Usage: node fs.js read');
    } else if (subcommand === 'create') {
      console.error('Usage: node fs.js create AGE KIND NAME');
    } else if (subcommand === 'update') {
      console.error('Usage: node fs.js update INDEX AGE KIND NAME');
    } else if (subcommand === 'destroy') {
      console.error('Usage: node fs.js destroy INDEX');
    } else {
      console.error('Usage: node fs.js [read | create | update | destroy]');
    }
    process.exit(1);
  }
  

// Function to read the pets data from the file.
function readPetsFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    process.exit(1);
  }
}

// Function to write the pets data to the file.
function writePetsFile(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing the file:', error);
    process.exit(1);
  }
}

// Function to display the contents of the pets data file.
function readPets() {
  const jsonData = readPetsFile();
  console.log(jsonData);
}

// Function to create a new pet record.
function createPet(age, kind, name) {
  const jsonData = readPetsFile();
  jsonData.push({ age, kind, name });
  writePetsFile(jsonData);
  console.log({ age, kind, name });
}

// Function to update an existing pet record.
function updatePet(index, age, kind, name) {
  const jsonData = readPetsFile();
  if (index >= 0 && index < jsonData.length) {
    jsonData[index] = { age, kind, name };
    writePetsFile(jsonData);
    console.log({ age, kind, name });
  } else {
    console.error('Usage: node fs.js update INDEX AGE KIND NAME');
    process.exit(1);
  }
}

// Function to delete a pet record.
function destroyPet(index) {
  const jsonData = readPetsFile();
  if (index >= 0 && index < jsonData.length) {
    jsonData.splice(index, 1);
    writePetsFile(jsonData);
    console.log('Record deleted successfully.');
  } else {
    console.error('Usage: node fs.js destroy INDEX');
    process.exit(1);
  }
}

// Check if command-line arguments are provided.
const args = process.argv.slice(2);

if (args.length === 0) {
    displayUsageAndExit();
  } else {
    const subcommand = args[0];
    if (subcommand === 'read') {
      readPets();
    } else if (subcommand === 'create' && args.length === 4) {
      createPet(parseInt(args[1]), args[2], args[3]);
    } else if (subcommand === 'update' && args.length === 5) {
      updatePet(parseInt(args[1]), parseInt(args[2]), args[3], args[4]);
    } else if (subcommand === 'destroy' && args.length === 2) {
      destroyPet(parseInt(args[1]));
    } else {
      displayUsageAndExit(subcommand);
    }
  }
  

