import { setting } from '#config/setting'
import { EmailSchema } from '@folie/castle/validator/index'
import vine from '@vinejs/vine'

export const GmailSchema = EmailSchema({
  host_whitelist: ['gmail.com'],
})

export const PasswordSchema = vine
  .string()
  .minLength(setting.passwordRequirement.size.min)
  .maxLength(setting.passwordRequirement.size.max)

export const SecureObjectValueSchema = vine
  .string()
  .minLength(1)
  .maxLength(setting.secureObject.maxSize)

export const SecureKeySchema = vine
  .string()
  .minLength(setting.secureKey.minSize)
  .maxLength(setting.secureKey.maxSize)
