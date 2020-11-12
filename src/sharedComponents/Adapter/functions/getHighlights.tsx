import { object, number, InferType } from 'yup';
import { AdapterFunctionType } from './index';

const schema = object({
  shards: number().required(),
  blocks: number().required(),
  addresses: number().required(),
  transactions: number().required(),
}).required();

export default async function getHighlights({
  provider,
  baseUrl,
  timeout,
}: AdapterFunctionType & {
  metaChainShardId: number;
  proxyUrl: string;
}) {
  try {
    const { data } = await provider({
      baseUrl,
      url: `/stats`,
      timeout,
    });

    const source: InferType<typeof schema> = data;

    schema.validate(source, { strict: true }).catch(({ errors }) => {
      console.error('Meta _source format errors: ', errors);
    });
    return {
      data,
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
}
