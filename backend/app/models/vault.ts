import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { StaticModelCache } from '@folie/castle/service/model_cache_service'
import { serializeDT } from '@folie/castle/helpers/serialize'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { table } from '#config/tables'
import { squid } from '#config/squid'
import cache from '@adonisjs/cache/services/main'
import User from './user.js'
import SecureObject from './secure_object.js'

export default class Vault extends BaseModel {
  static table = table.VAULT()

  // Serialize =============================

  static serialize(row: Vault) {
    return {
      id: squid.VAULT.encode(row.id),

      userId: row.userId,
      key: row.key,
      version: row.version,
      timeout: row.timeout,

      createdAt: serializeDT(row.createdAt),
      updatedAt: serializeDT(row.updatedAt),
    }
  }

  $serialize() {
    return Vault.serialize(this)
  }

  $toJSON() {
    return {
      id: this.id,

      userId: this.userId,
      key: this.key,
      version: this.version,
      timeout: this.timeout,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  // Cache =============================

  static cache() {
    return new StaticModelCache<Vault, 'metric'>(
      cache.namespace(this.table),
      (v) => new Vault().fill(v),
      (i) => Vault.find(i)
    )
  }

  cache() {
    return Vault.cache().internal(this)
  }

  $metric(this: Vault, options?: { latest?: boolean }) {
    return this.cache().get({
      key: 'metric',
      factory: async () => {
        const objectCount = await this.related('secureObjects')
          .query()
          .count('* as $$total')
          .first()

        if (!objectCount) {
          throw new Error('Failed to fetch metric data')
        }

        return {
          objectCount: objectCount.$$total,
        }
      },
      parser: async (o) => o,
      latest: options?.latest,
      options: {
        ttl: '1 hour',
      },
    })
  }

  // Columns =============================

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare key: string

  @column()
  declare version: number

  @column()
  declare timeout: number | null

  // DateTime =============================

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Hooks =============================

  // Relations =============================

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => SecureObject)
  declare secureObjects: HasMany<typeof SecureObject>

  // Extra ======================================

  isActive() {
    return this.version > 0
  }
}
