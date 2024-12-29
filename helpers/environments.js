const environments = {};

environments.staging = {
  port: 3000,
  envName: 'staging',
  secretKey: 'hlhkhlkjl',
}

environments.production = {
  port: 5000,
  envName: 'production',
  secretKey: 'sflkalkjkjl',
}

// determine which environment was pased
const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const envToExport = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;

module.exports = envToExport;
