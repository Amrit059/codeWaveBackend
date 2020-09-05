import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export const ENVIRONMENT = process.env.NODE_ENV;

switch (ENVIRONMENT) {
    case 'production': {
        if (fs.existsSync(path.join(process.cwd(), '/.env'))) {
            dotenv.config({ path: '.env' });
        } else {
            process.exit(1);
        }
        break;
    }
    case 'development': {
        if (fs.existsSync(path.join(process.cwd(), '/.env.development'))) {
            dotenv.config({ path: '.env.development' });
        } else {
            // console.log('Unable to find Environment File')
            process.exit(1);
        }
        break;
    }
    case 'staging': {
        if (fs.existsSync(path.join(process.cwd(), '/.env.staging'))) {
            dotenv.config({ path: '.env.staging' });
        } else {
            process.exit(1);
        }
        break;
    }
    case 'testing': {
        if (fs.existsSync(path.join(process.cwd(), '/.env.testing'))) {
            dotenv.config({ path: '.env.testing' });
        } else {
            process.exit(1);
        }
        break;
    }
    default: {
        if (fs.existsSync(path.join(process.cwd(), '/.env.local'))) {
            dotenv.config({ path: '.env.local' });
        } else {
            process.exit(1);
        }

    }
}

export const SERVER = {
    APP_NAME: 'CODE_WAVE',
    PORT: process.env['PORT'],
    MONGODB_URL: process.env['MONGODB_URL'],
    JWT_PUBLIC_KEY: process.env['PUBLIC_KEY']
};