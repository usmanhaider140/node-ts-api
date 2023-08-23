import chalk from 'chalk';

export default class Logging {
    public static info = (args: any) => console.log(chalk.blue(`${new Date().toISOString()} [INFO] ${typeof args === 'string' ? chalk.blueBright(args) : args}`));
    public static error = (args: any) => console.log(chalk.red(`${new Date().toISOString()} [ERROR] ${typeof args === 'string' ? chalk.redBright(args) : args}`));
    public static warn = (args: any) => console.log(chalk.yellow(`${new Date().toISOString()} [WARN] ${typeof args === 'string' ? chalk.yellowBright(args) : args}`));
    public static debug = (args: any) => console.log(chalk.magenta(`${new Date().toISOString()} [DEBUG] ${typeof args === 'string' ? chalk.magentaBright(args) : args}`));
    public static trace = (args: any) => console.log(chalk.bgCyan(`${new Date().toISOString()} [TRACE] ${typeof args === 'string' ? chalk.whiteBright(args) : args}`));
}
