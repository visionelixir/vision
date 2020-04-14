/*
import { View, KeyValue } from '@glacial/framework'

export const errorHandler = async (
  statusCode: number,
  ctx: KeyValue,
): Promise<void> => {
  switch (statusCode) {
    case 500:
      ctx.body = await View.render('500', {
        page: { title: 'Uh oh...', name: 'Something went wrong...' },
      })
      break
    case 404:
      ctx.body = await View.render('404', {
        page: { title: 'Uh oh...', name: 'That page was not found...' },
      })
      break
    default:
      ctx.body = await View.render('error', {
        page: { title: 'Uh oh...', name: 'Something went wrong...' },
      })
  }
}
*/
