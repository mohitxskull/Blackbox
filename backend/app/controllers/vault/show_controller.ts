import { routeController } from '@folie/castle'

export default routeController({
  handle: async ({ ctx }) => {
    const { user } = ctx.session

    await user.load('vault')

    return { vault: ctx.session.user.vault.$serialize() }
  },
})
