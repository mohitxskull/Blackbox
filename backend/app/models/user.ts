import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { StaticModelCache } from '@folie/castle/service/model_cache_service'
import { serializeDT } from '@folie/castle/helpers/serialize'
import hash from '@adonisjs/core/services/hash'
import Session from './session.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { table } from '#config/tables'
import { squid } from '#config/squid'
import cache from '@adonisjs/cache/services/main'
import Vault from './vault.js'

export default class User extends BaseModel {
  static table = table.USER()

  // Serialize =============================

  static serialize(row: User) {
    return {
      id: squid.USER.encode(row.id),

      firstName: row.firstName,
      lastName: row.lastName,

      email: row.email,

      createdAt: serializeDT(row.createdAt),
      updatedAt: serializeDT(row.updatedAt),
      verifiedAt: serializeDT(row.verifiedAt),
    }
  }

  $serialize() {
    return User.serialize(this)
  }

  $toJSON() {
    return {
      id: this.id,

      firstName: this.firstName,
      lastName: this.lastName,

      email: this.email,
      password: this.password,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      verifiedAt: this.verifiedAt,
    }
  }

  // Cache =============================

  static cache() {
    return new StaticModelCache<User>(
      cache.namespace(this.table),
      (v) => new User().fill(v),
      (i) => User.find(i)
    )
  }

  cache() {
    return User.cache().internal(this)
  }

  // Columns =============================

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  // DateTime =============================

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare verifiedAt: DateTime | null

  // Hooks =============================

  @beforeSave()
  static async hashPassword(row: User) {
    if (row.$dirty.password) {
      row.password = await hash.make(row.password)
    }
  }

  // Relations =============================

  @hasMany(() => Session)
  declare sessions: HasMany<typeof Session>

  @hasOne(() => Vault)
  declare vault: HasOne<typeof Vault>

  // Extra ======================================
}
