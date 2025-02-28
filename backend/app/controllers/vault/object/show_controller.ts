import { squid } from '#config/squid'
import { routeController } from '@folie/castle'
import ProcessingException from '@folie/castle/exception/processing_exception'
import vine from '@vinejs/vine'

export default routeController({
  input: vine.compile(
    vine.object({
      params: vine.object({
        secureObjectId: squid.SECURE_OBJECT.schema,
      }),
    })
  ),

  handle: async ({ payload, ctx }) => {
    const { user } = ctx.session

    await user.load('vault')

    const secureObject = await user.vault
      .related('secureObjects')
      .query()
      .where('id', payload.params.secureObjectId)
      .first()

    if (!secureObject) {
      throw new ProcessingException('Secure object not found')
    }

    return { secureObject: secureObject.$serialize() }
  },
})
