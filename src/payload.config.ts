// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Recipes } from './collections/Recipes'
import { IngredientUnits } from './collections/IngredientUnits'
import { CookingMethods } from './collections/CookingMethods'
import { Cuisines } from './collections/Cuisines'
import { DifficultyLevels } from './collections/DifficultyLevels'
import { Seasons } from './collections/Seasons'
import { DietaryTypes } from './collections/DietaryTypes'
import { IngredientCategories } from './collections/IngredientCategories'
import { Ingredients } from './collections/Ingredients'
import { Continents } from './collections/Continents'
import { Countries } from './collections/Countries'
import { Regions } from './collections/Regions'
import { Cities } from './collections/Cities'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Recipes,
    Ingredients,
    IngredientUnits,
    CookingMethods,
    Cuisines,
    DifficultyLevels,
    Seasons,
    DietaryTypes,
    IngredientCategories,
    Continents,
    Countries,
    Regions,
    Cities,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
