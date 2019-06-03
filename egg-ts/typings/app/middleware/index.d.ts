// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminauth from '../../../app/middleware/adminauth';
import ExportCompress from '../../../app/middleware/compress';

declare module 'egg' {
  interface IMiddleware {
    adminauth: typeof ExportAdminauth;
    compress: typeof ExportCompress;
  }
}
