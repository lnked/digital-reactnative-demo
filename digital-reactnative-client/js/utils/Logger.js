const consoleLogger = {
  type: 'logger',

  log(args) {
    this._output('log', args);
  },

  warn(args) {
    this._output('warn', args);
  },

  error(args) {
    this._output('error', args);
  },

  _output(type, args) {
    if (console && console[type]) console[type](...Array.prototype.slice.call(args));
  },
};

class Logger {
  constructor(concreteLogger, options = {}) {
    this.subs = [];
    this.init(concreteLogger, options);
  }

  init(concreteLogger, options = {}) {
    this.prefix = options.prefix || 'dormakaba:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = __DEV__;
  }

  setDebug(bool) {
    this.debug = bool;
    this.subs.forEach(sub => {
      sub.setDebug(bool);
    });
  }

  log() {
    this.forward(arguments, 'log', '', true);
  }

  warn() {
    this.forward(arguments, 'warn', '', true);
  }

  error() {
    this.forward(arguments, 'error', '');
  }

  critical() {
    this.forward(arguments, 'critical', '');
  }

  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return;
    if (typeof args[0] === 'string') args[0] = `${prefix + this.prefix} ${args[0]}`;
    this.logger[lvl](args);
  }

  create(moduleName) {
    const sub = new Logger(this.logger, {
      ...{ prefix: `${this.prefix}:${moduleName}:` },
      ...this.options,
    });
    this.subs.push(sub);

    return sub;
  }
}

export default new Logger();
