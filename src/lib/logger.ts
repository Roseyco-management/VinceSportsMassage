/**
 * Simple structured logging abstraction
 * Provides consistent logging format with context objects
 */

type LogLevel = "ERROR" | "WARN" | "INFO"

interface LogContext {
  [key: string]: unknown
}

function formatLog(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString()
  const contextStr = context ? ` | context: ${JSON.stringify(context)}` : ""
  return `[${level}] ${timestamp} - ${message}${contextStr}`
}

export const logger = {
  error(message: string, context?: LogContext): void {
    console.error(formatLog("ERROR", message, context))
  },

  warn(message: string, context?: LogContext): void {
    console.warn(formatLog("WARN", message, context))
  },

  info(message: string, context?: LogContext): void {
    console.log(formatLog("INFO", message, context))
  },
}
