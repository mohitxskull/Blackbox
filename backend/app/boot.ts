import db from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'
import User from '#models/user'

export const boot = async () => {
  logger.info('Initializing app...')

  const exist = await User.findBy('email', 'mohitxskull@gmail.com')

  if (!exist) {
    const trx = await db.transaction()

    try {
      const user = await User.create(
        {
          email: 'mohitxskull@gmail.com',
          password: 'master$master',
          firstName: 'Skull',
          lastName: 'Dot',
        },
        {
          client: trx,
        }
      )

      await user.related('vault').create({
        version: 0,
        key: '',
        timeout: 5 * 60,
      })
    } catch (error) {
      await trx.rollback()

      throw error
    }
  }

  logger.info('App initialized')
}
