import { type SchemaTypeDefinition } from 'sanity'
import {authorType} from './authorType'
import { startupType } from './startup'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ authorType,startupType, playlist],
}
