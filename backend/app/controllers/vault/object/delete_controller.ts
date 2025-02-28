import { squid } from '#config/squid'
import db from '@adonisjs/lucid/services/db'
import { routeController } from '@folie/castle'
import ProcessingException from '@folie/castle/exception/processing_exception'
import vine from '@vinejs/vine'

export default routeController({
  input: vine.compile(
    vine.object({
      params: vine.object({
        secretObjectId: squid.SECURE_OBJECT.schema,
      }),
    })
  ),

  handle: async ({ payload, ctx }) => {
    const trx = await db.transaction({
      isolationLevel: 'read committed',
    })

    try {
      const { user } = ctx.session

      user.useTransaction(trx)

      await user.load('vault')

      const secureObject = await user.vault
        .related('secureObjects')
        .query()
        .where('id', payload.params.secretObjectId)
        .first()

      if (!secureObject) {
        throw new ProcessingException('Secure object not found')
      }

      await Promise.all([
        user.vault.refresh(),
        secureObject.delete(),
        user.vault.cache().expire('metric'),
      ])

      user.vault.version += 1

      user.vault.save()

      await trx.commit()

      return {
        vault: user.vault.$serialize(),
        secureObject: secureObject.$serialize(),
        message: 'Secure object deleted successfully',
      }
    } catch (error) {
      await trx.rollback()

      throw error
    }
  },
})
