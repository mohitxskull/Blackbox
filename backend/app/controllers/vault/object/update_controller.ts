import { squid } from '#config/squid'
import { SecureObjectValueSchema } from '#validators/index'
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
      version: vine.number().min(1).max(1000),
      value: SecureObjectValueSchema,
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

      if (secureObject.version >= payload.version) {
        throw new ProcessingException('Secure object version is outdated', {
          source: 'version',
        })
      }

      secureObject.value = payload.value
      secureObject.version = payload.version

      await user.vault.refresh()

      user.vault.version += 1

      await Promise.all([secureObject.save(), user.vault.save()])

      await trx.commit()

      return {
        vault: user.vault.$serialize(),
        secureObject: secureObject.$serialize(),
        message: 'Secure object updated successfully',
      }
    } catch (error) {
      await trx.rollback()

      throw error
    }
  },
})
