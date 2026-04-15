import type { TestInfo } from '@playwright/test';

type LogLevel = 'INFO' | 'ACTION' | 'SUCCESS' | 'WARN' | 'ERROR';

interface ActiveLogRun {
  entries: string[];
  testName: string;
}

export class Logger {
  private static activeRun: ActiveLogRun | null = null;

  static startTest(testInfo: TestInfo): void {
    Logger.activeRun = {
      entries: [],
      testName: testInfo.titlePath.join(' > '),
    };

    Logger.info(`Starting test: ${Logger.activeRun.testName}`);
  }

  static async attachToTest(testInfo: TestInfo): Promise<void> {
    if (!Logger.activeRun) {
      return;
    }

    Logger.info(`Finishing test with status: ${testInfo.status ?? 'unknown'}`);

    await testInfo.attach('framework-log', {
      body: Buffer.from(Logger.activeRun.entries.join('\n'), 'utf8'),
      contentType: 'text/plain',
    });
  }

  static reset(): void {
    Logger.activeRun = null;
  }

  static info(message: string): void {
    Logger.log('INFO', message, console.log);
  }

  static action(message: string): void {
    Logger.log('ACTION', message, console.log);
  }

  static success(message: string): void {
    Logger.log('SUCCESS', message, console.log);
  }

  static warn(message: string): void {
    Logger.log('WARN', message, console.warn);
  }

  static error(message: string): void {
    Logger.log('ERROR', message, console.error);
  }

  private static log(
    level: LogLevel,
    message: string,
    writer: (message?: unknown, ...optionalParams: unknown[]) => void
  ): void {
    const entry = `[${new Date().toISOString()}] [${level}] ${message}`;

    writer(entry);
    Logger.activeRun?.entries.push(entry);
  }
}
