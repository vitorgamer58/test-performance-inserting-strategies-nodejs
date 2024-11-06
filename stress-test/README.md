# K6 Stress Tests

This repository contains stress tests implemented using the K6 testing framework. The tests are designed to evaluate the performance and scalability of your application by simulating load under various conditions.

## Requirements

- [K6](https://k6.io) installed on your machine.
- Node.js and npm (for running the tests via package.json).

## Available Commands

The following commands are defined in the `package.json` file:

1. **Stress Test - Single Item**
   - Command: 
     ```bash
     npm run test:stress:one
     ```
   - Description: This command runs a stress test where one item is sent per iteration. It's useful for testing the performance of your application with minimal load.

2. **Stress Test - Batch of 1000 Items**
   - Command:
     ```bash
     npm run test:stress:batch
     ```
   - Description: This command runs a stress test where 1000 items are sent per iteration. It helps in assessing the application's performance under higher load conditions.

## Usage

To run the stress tests, navigate to the directory containing this repository and execute one of the commands above using npm.

### Example

```bash
# To run the stress test sending one item per VU iteration
npm run test:stress:one

# To run the stress test sending 1000 items per VU iteration
npm run test:stress:batch
```

## Output

The output of the tests will be displayed in the terminal, providing metrics such as response times, throughput, and error rates. Analyze these metrics to identify performance bottlenecks and ensure your application can handle the expected load.
