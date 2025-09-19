import type { CollectionConfig } from 'payload'
import sharp from 'sharp'
import fs from 'fs'
import { randomUUID } from 'crypto'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Media Management',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/ogg',
    ],
    imageSizes: [
      {
        name: 'large',
        width: 1280,
        position: 'centre',
        generateImageName: ({ originalName, sizeName, extension }) => {
          const baseName = originalName.replace('-xlarge', '')
          return `${baseName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'medium',
        width: 960,
        position: 'centre',
        generateImageName: ({ originalName, sizeName, extension }) => {
          const baseName = originalName.replace('-xlarge', '')
          return `${baseName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'small',
        width: 640,
        position: 'centre',
        generateImageName: ({ originalName, sizeName, extension }) => {
          const baseName = originalName.replace('-xlarge', '')
          return `${baseName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'xsmall',
        width: 400,
        position: 'centre',
        generateImageName: ({ originalName, sizeName, extension }) => {
          const baseName = originalName.replace('-xlarge', '')
          return `${baseName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'xxsmall',
        width: 200,
        position: 'centre',
        generateImageName: ({ originalName, sizeName, extension }) => {
          const baseName = originalName.replace('-xlarge', '')
          return `${baseName}-${sizeName}.${extension}`
        },
      },
    ],
  },
  fields: [
    {
      name: 'aspectRatio',
      label: 'Görsel Oranı',
      type: 'select',
      required: true,
      options: [
        { label: '16:9 Yatay (1920×1080)', value: '16x9' },
        { label: '1:1 Kare (1920×1920)', value: '1x1' },
        { label: '9:16 Dikey (1920×3413)', value: '9x16' },
      ],
      admin: {
        description: "Yüklenecek görselin aspect ratio'sunu seçin",
      },
      validate: async (
        value: unknown,
        {
          req,
        }: {
          data?: unknown
          req?: { file?: { data?: Buffer; buffer?: Buffer; tempFilePath?: string } }
        },
      ) => {
        if (!value) return 'Aspect ratio seçimi zorunludur.'

        // File upload validation
        if (req?.file && value) {
          try {
            let buffer
            if (req.file.data) {
              buffer = req.file.data
            } else if (req.file.buffer) {
              buffer = req.file.buffer
            } else if (req.file.tempFilePath) {
              buffer = fs.readFileSync(req.file.tempFilePath)
            } else {
              return true
            }

            const metadata = await sharp(buffer).metadata()
            const width = metadata.width
            const height = metadata.height

            if (!width || !height) return true

            // Aspect ratio configuration
            const aspectRatioConfig = {
              '16x9': {
                ratio: 16 / 9,
                name: '16:9 Yatay',
                recommendedWidth: 1920,
                recommendedHeight: 1080,
                minimumWidth: 1920,
                minimumHeight: 1080,
              },
              '1x1': {
                ratio: 1,
                name: '1:1 Kare',
                recommendedWidth: 1920,
                recommendedHeight: 1920,
                minimumWidth: 1920,
                minimumHeight: 1920,
              },
              '9x16': {
                ratio: 1 / 2,
                name: '9:16 Dikey',
                recommendedWidth: 1920,
                recommendedHeight: 3413,
                minimumWidth: 1920,
                minimumHeight: 3413,
              },
            }

            const config = aspectRatioConfig[value as keyof typeof aspectRatioConfig]
            if (!config) return true

            const actualRatio = width / height
            const expectedRatio = config.ratio
            const tolerance = 0.1
            const ratioDifference = Math.abs(actualRatio - expectedRatio)

            const isValidAspectRatio = ratioDifference <= tolerance
            const meetsMinimumSize = width >= config.minimumWidth && height >= config.minimumHeight

            if (!isValidAspectRatio) {
              return `🚫 Aspect Ratio Hatası: ${config.name} seçimi için ${config.recommendedWidth}×${config.recommendedHeight} boyutunda görsel yükleyin. (Mevcut: ${width}×${height})`
            }

            if (!meetsMinimumSize) {
              return `📏 Boyut Yetersiz: Minimum ${config.minimumWidth}×${config.minimumHeight} gerekli. Mevcut: ${width}×${height}. İdeal: ${config.recommendedWidth}×${config.recommendedHeight}`
            }
          } catch (error) {
            console.warn('Image validation error:', error)
            return true
          }
        }

        return true
      },
    },
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      admin: {
        placeholder: 'Görselin kısa açıklaması',
        description: 'Görsel için açıklama metni (kullanıcılara gösterilir)',
      },
    },
  ],
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          // UUID ile benzersiz dosya ismi oluştur
          const uuid = randomUUID()
          const fileSize = Math.round(req.file.size / 1024) // KB cinsinden
          const extension = req.file.name.split('.').pop()

          // Yeni dosya ismi: uuid_sizeKB-xlarge.extension
          req.file.name = `${uuid}_${fileSize}KB-xlarge.${extension}`
        }
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        // Basit log - sadece validation
        if (req.file && doc.aspectRatio) {
          console.log(
            `✅ Image uploaded: ${doc.filename} (${doc.width}x${doc.height}) - ${doc.aspectRatio} format`,
          )
        }
      },
    ],
  },
}
