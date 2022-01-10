import path from 'path';
import envSchema from 'env-schema';
import { Type } from '@sinclair/typebox';

export default function loadConfig(): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const result = require('dotenv').config({
    path: path.join(__dirname, `../../${process.env.NODE_ENV ?? 'development'}.env`),
  });

  if (result.error) {
    throw new Error(result.error);
  }

  envSchema({
    data: result.parsed,
    schema: Type.Strict(
      Type.Object({
        NODE_ENV: Type.Union([
          Type.Literal('development'),
          Type.Literal('test'),
          Type.Literal('production'),
        ]),
        API_PORT: Type.Number(),
        API_HOST: Type.String(),
      }),
    ),
  });
}
