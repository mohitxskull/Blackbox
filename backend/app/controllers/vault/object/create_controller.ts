import { setting } from '#config/setting'
import { SecureKeySchema, SecureObjectValueSchema } from '#validators/index'
import { routeController } from '@folie/castle'
import ProcessingException from '@folie/castle/exception/processing_exception'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'

export default routeController({
  input: vine.compile(
    vine.object({
      key: SecureKeySchema,
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

      const metrics = await user.vault.$metric()

      if (metrics.objectCount >= setting.secureObject.maxCount) {
        throw new ProcessingException("You can't create more simple objects", {
          meta: {
            metrics,
            secureObjectSetting: setting.secureObject,
          },
        })
      }

      const [secureObject] = await Promise.all([
        user.vault.related('secureObjects').create({
          value: payload.value,
          key: payload.key,
          version: 0,
        }),
        user.vault.refresh(),
      ])

      user.vault.version += 1

      await user.vault.save()

      await trx.commit()

      return {
        vault: user.vault.$serialize(),
        secureObject: secureObject.$serialize(),
        message: 'Secure object created successfully',
      }
    } catch (error) {
      await trx.rollback()

      throw error
    }
  },
})
