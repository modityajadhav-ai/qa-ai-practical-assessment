const fs = require('fs');
const path = require('path');

/**
 * Read and parse a JSON file from the test-data directory.
 * @param {string} relativePath — path relative to test-data/ (e.g. 'api/users.json')
 * @returns {unknown}
 */
function readJson(relativePath) {
  const filePath = path.resolve(__dirname, '../test-data', relativePath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Read a CSV file and return rows as objects (first row = headers).
 * @param {string} relativePath — path relative to test-data/
 * @returns {Record<string, string>[]}
 */
function readCsv(relativePath) {
  const filePath = path.resolve(__dirname, '../test-data', relativePath);
  const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

module.exports = { readJson, readCsv };
