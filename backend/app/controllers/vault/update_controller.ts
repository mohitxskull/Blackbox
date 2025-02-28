import { SecureKeySchema } from '#validators/index'
import { routeController } from '@folie/castle'
import ProcessingException from '@folie/castle/exception/processing_exception'
import vine from '@vinejs/vine'

export default routeController({
  input: vine.compile(
    vine.object({
      key: SecureKeySchema.optional(),
      timeout: vine.number().min(10).max(3600).nullable().optional(),
    })
  ),

  handle: async ({ payload, ctx }) => {
    const { user } = ctx.session

    await user.load('vault')

    if (payload.key !== undefined) {
      if (user.vault.isActive()) {
        throw new ProcessingException('Vault is already active')
      }

      user.vault.key = payload.key
    }

    if (payload.timeout !== undefined) {
      user.vault.timeout = payload.timeout
    }

    await user.vault.save()

    return {
      vault: user.vault.$serialize(),
      message: 'Vault updated successfully',
    }
  },
})
