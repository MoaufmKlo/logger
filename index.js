const fs = require("fs");

class Logger {
    /**
     * Initiate logger.
     * @param {Object} [config] Logger config
     * @param {string} [config.logsPath] Path to write log files to
     * @returns {null}
     */
    constructor(config) {
        this.logsPath = (config || {}).logsPath || "./logs";
        if (!this.logsPath.endsWith("/")) this.logsPath += "/";

        // Create folder at path if it doesn't exist
        if (!fs.existsSync(this.logsPath)) fs.mkdirSync(this.logsPath);
    };

    /**
     * Log a message to the current log file.
     * @param {"info" | "warn" | "error"} type Type of log (info, warn, error)
     * @param {string} message Log content
     * @returns {null}
     */
    log(type = "", message = "") {
        // Validate arguments
        if (![
                "info",
                "error",
                "warn"
            ].includes(type || "")) throw ("Argument 0 (type) must be info, error or warn.");
        if (typeof message !== "string") throw ("Argument 1 (message) must be a string.");

        // Date- and time-related variables
        const date = new Date();
        const fileName = `${("0" + date.getUTCFullYear()).slice(-2)}-${("0" + date.getUTCMonth()).slice(-2)}-${("0" + date.getUTCDate()).slice(-2)}`;
        const timestamp = `${("0" + date.getUTCHours()).slice(-2)}:${("0" + date.getUTCMinutes()).slice(-2)}:${("0" + date.getUTCSeconds()).slice(-2)}`;

        fs.appendFileSync(`${this.logsPath}${fileName}.log`, `[${timestamp}] [${type.toUpperCase()}]: ${message}\n`);
    };
};

module.exports = Logger;