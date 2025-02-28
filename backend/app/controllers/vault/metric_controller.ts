import { routeController } from '@folie/castle'

export default routeController({
  handle: async ({ ctx }) => {
    const { user } = ctx.session

    await user.load('vault')

    const metrics = await user.vault.$metric()

    return { metrics }
  },
})
