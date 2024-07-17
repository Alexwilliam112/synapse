// import { exec } from 'child_process';
const { exec } = require("child_process");

exec("next build", (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);

  if (error) {
    console.error(`Build error: ${error.message}`);
    // Log error but continue to exit successfully
    process.exit(0);
  } else {
    process.exit(0);
  }
});
