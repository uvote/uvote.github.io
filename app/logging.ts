/* eslint-disable no-console */

/**
 * Prints log with "Info" level, only when the webapp is running in development
 * MODE.
 */
export const info = import.meta.env.DEV
  ? console.info.bind(console)
  : Function.prototype;

/** Prints error with "Warn" level, on any env MODE. */
export const warn = console.warn.bind(console);

/** Prints error with "Error" level, on any env MODE. */
export const debug = console.error.bind(console);
