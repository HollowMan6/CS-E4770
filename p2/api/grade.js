const run = async (cmdList) => {
  const process = Deno.run({ cmd: cmdList });
  await process.status();
};

const createGradingContainer = async (code, randomKey) => {
  const randomFileName = `submission-${randomKey}.data`;
  await Deno.writeTextFile(randomFileName, code);

  const graderContainerName = `submission-image-${randomKey}`;
  const tmpGraderContainerName = `${graderContainerName}-tmp`;

  await run([
    "docker",
    "create",
    "--name",
    tmpGraderContainerName,
    "grader-image",
  ]);

  await run([
    "docker",
    "cp",
    randomFileName,
    `${tmpGraderContainerName}:/app/submission/submitted_code.data`,
  ]);

  await run(["docker", "commit", tmpGraderContainerName, graderContainerName]);

  await run(["docker", "rm", "-fv", tmpGraderContainerName]);

  await Deno.remove(randomFileName);

  return graderContainerName;
};

const runGradingContainer = async (graderContainerName, randomKey) => {
  await run([
    "docker",
    "run",
    "--name",
    `${graderContainerName}-image`,
    graderContainerName,
  ]);

  await run([
    "docker",
    "cp",
    `${graderContainerName}-image:/app/submission/result.data`,
    `result-${randomKey}.data`,
  ]);

  await run(["docker", "image", "rm", "-f", `${graderContainerName}`]);

  await run(["docker", "rm", "-fv", `${graderContainerName}-image`]);

  const result = await Deno.readTextFile(`result-${randomKey}.data`);

  await Deno.remove(`result-${randomKey}.data`);

  return result.trim();
};

const grade = async (code) => {
  const randomKey = Math.floor(Math.random() * 900000000 + 100000000);

  const graderContainerName = await createGradingContainer(code, randomKey);
  const result = await runGradingContainer(graderContainerName, randomKey);

  return result;
};

export { grade };
