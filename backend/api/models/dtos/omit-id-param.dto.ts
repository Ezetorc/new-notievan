import * as z from 'zod'

export const OmitIdParamDto = z.object({
  omit: z.cuid()
})
