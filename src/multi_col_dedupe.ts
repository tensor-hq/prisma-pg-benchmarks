// Benchmarks deduping on insert with multi-column unique indexes.

import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { mean, std } from "mathjs";

const prisma = new PrismaClient();

const minRows = 100;
const maxRows = 500;
const numVals = 100000000;
const maxTimeSecs = 600;

const seed = uuidv4();

const _getRandomStr = () => {
  return uuidv5(`${Math.floor(Math.random() * numVals)}`, seed);
};
const _getRandomNumRows = () => {
  return Math.round(minRows + Math.random() * (maxRows - minRows));
};

const _getRandomRow = () => {
  return {
    a: _getRandomStr(),
    b: _getRandomStr(),
    c: _getRandomStr(),
    d: _getRandomStr(),
    e: _getRandomStr(),
    f: _getRandomStr(),
    g: _getRandomStr(),
  };
};

const _getRandomRows = () => {
  return Array(_getRandomNumRows())
    .fill(null)
    .map(() => _getRandomRow());
};

const runTestSuite = async (maxTimeSecs: number, fn: () => Promise<void>) => {
  const begin = new Date().getTime();
  let prev = begin;
  const timings = [];
  while (true) {
    await fn();
    const cur = new Date().getTime();
    timings.push(cur - prev);
    prev = cur;

    if (prev - begin >= maxTimeSecs * 1000) break;
  }

  return {
    max: Math.max(...timings),
    avg: mean(timings),
    sd: std(timings),
    count: timings.length,
  };
};

(async () => {
  for (const [idx, table] of [
    prisma.multiColDedupe1,
    prisma.multiColDedupe2,
    prisma.multiColDedupe3,
  ].entries()) {
    const { count } = await table.deleteMany({});
    console.log(`Deleted ${count} rows from table ${idx + 1}`);

    console.log(`Running test ${idx}...`);
    const result = await runTestSuite(maxTimeSecs, async () => {
      const { count } = await table.createMany({
        data: _getRandomRows(),
        skipDuplicates: true,
      });
    });
    console.log(`test ${idx} result: ${JSON.stringify(result, null, 2)}`);
  }
})();
