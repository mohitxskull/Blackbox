import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { StaticModelCache } from '@folie/castle/service/model_cache_service'
import { serializeDT } from '@folie/castle/helpers/serialize'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { table } from '#config/tables'
import { squid } from '#config/squid'
import cache from '@adonisjs/cache/services/main'
import Vault from './vault.js'

export default class SecureObject extends BaseModel {
  static table = table.SECURE_OBJECT()

  // Serialize =============================

  static serialize(row: SecureObject) {
    return {
      id: squid.USER.encode(row.id),

      vaultId: row.vaultId,
      value: row.value,
      key: row.key,
      version: row.version,

      createdAt: serializeDT(row.createdAt),
      updatedAt: serializeDT(row.updatedAt),
    }
  }

  $serialize() {
    return SecureObject.serialize(this)
  }

  $toJSON() {
    return {
      id: this.id,

      vaultId: this.vaultId,
      value: this.value,
      key: this.key,
      version: this.version,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  // Cache =============================

  static cache() {
    return new StaticModelCache<SecureObject>(
      cache.namespace(this.table),
      (v) => new SecureObject().fill(v),
      (i) => SecureObject.find(i)
    )
  }

  cache() {
    return SecureObject.cache().internal(this)
  }

  // Columns =============================

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vaultId: number

  @column()
  declare key: string

  @column()
  declare value: string

  @column()
  declare version: number

  // DateTime =============================

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Hooks =============================

  // Relations =============================

  @belongsTo(() => Vault)
  declare vault: BelongsTo<typeof Vault>

  // Extra ======================================

  declare $$total: number
}
