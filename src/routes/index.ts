import { NowRequestHandler } from 'fastify-now';
import { Static, Type } from '@sinclair/typebox';

const GetReply = Type.Object({
  hello: Type.String(),
});

export const GET: NowRequestHandler<{
  Reply: Static<typeof GetReply>;
}> = async function () {
  return { hello: 'world' };
};

GET.opts = {
  schema: {
    response: {
      200: GetReply,
    },
  },
};
