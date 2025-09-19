import type { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'region', 'population', 'isActive'],
    group: 'Geography',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Genel Bilgiler',
          fields: [
            {
              name: 'name',
              label: 'Şehir Adı',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Örn: İstanbul, Roma, Paris',
                description: 'Şehrin tam adı',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'textarea',
              maxLength: 500,
              admin: {
                placeholder: 'Bu şehir hakkında kısa bir açıklama',
                description: 'Şehrin hakkında açıklama',
              },
            },
            {
              name: 'content',
              label: 'İçerik',
              type: 'richText',
              admin: {
                description: 'Bu şehir hakkında detaylı bilgiler',
              },
            },
            {
              name: 'continent',
              label: 'Kıta',
              type: 'relationship',
              relationTo: 'continents',
              admin: {
                description: 'Bu şehrin ait olduğu kıta',
              },
            },
            {
              name: 'country',
              label: 'Ülke',
              type: 'relationship',
              relationTo: 'countries',
              admin: {
                description: 'Bu şehrin ait olduğu ülke',
              },
            },
            {
              name: 'region',
              label: 'Bölge',
              type: 'relationship',
              relationTo: 'regions',
              admin: {
                description: 'Bu şehrin ait olduğu bölge (opsiyonel)',
              },
            },
          ],
        },
        {
          label: 'Koordinatlar',
          fields: [
            {
              name: 'latitude',
              label: 'Enlem',
              type: 'number',
              admin: {
                placeholder: '41.0082',
              },
            },
            {
              name: 'longitude',
              label: 'Boylam',
              type: 'number',
              admin: {
                placeholder: '28.9784',
              },
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            {
              name: 'jpg',
              label: 'JPG',
              type: 'group',
              fields: [
                {
                  name: 'ratio16x9',
                  label: 'Yatay (16:9 - 1920x1080 - JPG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'ratio1x1',
                  label: 'Kare (1:1 - 1920x1920 - JPG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'ratio9x16',
                  label: 'Dikey (1:2 - 1920x3413 - JPG)',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'png',
              label: 'PNG',
              type: 'group',
              fields: [
                {
                  name: 'ratio16x9',
                  label: 'Yatay (16:9 - 1920x1080 - PNG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'ratio1x1',
                  label: 'Kare (1:1 - 1920x1920 - PNG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'ratio9x16',
                  label: 'Dikey (1:2 - 1920x3413 - PNG)',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Galeri',
          fields: [
            {
              name: 'gallery',
              label: 'Galeri',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  label: 'Başlık',
                  type: 'text',
                  admin: {
                    placeholder: 'Bu görselin başlığı',
                  },
                },
                {
                  name: 'description',
                  label: 'Açıklama',
                  type: 'textarea',
                  admin: {
                    placeholder: 'Bu görselinin açıklaması',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Yönetim',
          fields: [
            {
              name: 'slug',
              label: 'URL Slug',
              type: 'text',
              unique: true,
              admin: {
                description: 'URL için benzersiz kimlik',
                readOnly: true,
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.name) {
                      return data.name
                        .toLowerCase()
                        .replace(/ğ/g, 'g')
                        .replace(/ü/g, 'u')
                        .replace(/ş/g, 's')
                        .replace(/ı/g, 'i')
                        .replace(/ö/g, 'o')
                        .replace(/ç/g, 'c')
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .trim('-')
                    }
                    return value?.toLowerCase().trim()
                  },
                ],
              },
            },
            {
              name: 'sortOrder',
              label: 'Sıralama',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Listeleme sırası (düşük sayılar önce görünür)',
              },
            },
            {
              name: 'isActive',
              label: 'Status',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Şehirler sistemde kullanılabilir',
              },
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta Başlık',
              type: 'text',
              maxLength: 60,
              admin: {
                placeholder: 'İstanbul Yemekleri',
                description: 'Meta başlık (60 karakter)',
              },
            },
            {
              name: 'metaDescription',
              label: 'Meta Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder:
                  "İstanbul'un en lezzetli sokak lezzetleri ve geleneksel yemek tarifleri...",
                description: 'Meta açıklama (160 karakter)',
              },
            },
            {
              name: 'metaKeywords',
              label: 'Meta Anahtar Kelimeler',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  admin: {
                    placeholder: 'istanbul yemekleri, istanbul mutfağı, balık ekmek',
                  },
                },
              ],
              admin: {
                description: 'Meta anahtar kelimeler',
              },
            },
          ],
        },
      ],
    },
  ],
}
