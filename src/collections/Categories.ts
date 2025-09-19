import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent', 'isActive'],
    group: 'Content Management',
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
              label: 'Kategori Adı',
              type: 'text',
              required: true,
              minLength: 2,
              maxLength: 50,
              admin: {
                placeholder: 'Örn: Ana Yemek, Tatlı, Çorba',
                description: 'Kategorinin görünür adı',
              },
              validate: (value: unknown) => {
                if (typeof value !== 'string') return 'Kategori adı metin olmalıdır.'
                if (/^\s+$/.test(value)) return 'Kategori adı sadece boşluk olamaz.'
                if (!/^[\p{L}\p{N} _-]+$/u.test(value))
                  return 'Kategori adı sadece harf, rakam, boşluk, tire ve alt çizgi içerebilir.'
                return true
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'textarea',
              maxLength: 500,
              admin: {
                placeholder: 'Bu kategori hakkında kısa bir açıklama',
                description: 'Kategorinin açıklaması (SEO için önemli)',
              },
            },
            {
              name: 'parent',
              label: 'Üst Kategori',
              type: 'relationship',
              relationTo: 'categories',
              admin: {
                description: 'Bu kategori bir alt kategori ise üst kategorisini seçin',
              },
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            {
              name: 'JPG',
              label: 'JPG',
              type: 'group',
              fields: [
                {
                  name: 'jpg16x9',
                  label: 'Yatay (16:9 - 1920x1080 - JPG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'jpg1x1',
                  label: 'Kare (1:1 - 1080x1080 - JPG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'jpg1x2',
                  label: 'Dikey (1:2 - 1080x2160 - JPG)',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'PNG',
              label: 'PNG',
              type: 'group',
              fields: [
                {
                  name: 'png16x9',
                  label: 'Yatay (16:9 - 1920x1080 - PNG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'png1x1',
                  label: 'Kare (1:1 - 1080x1080 - PNG)',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'png1x2',
                  label: 'Dikey (1:2 - 1080x2160 - PNG)',
                  type: 'upload',
                  relationTo: 'media',
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
                placeholder: 'ana-yemek, tatli, corba',
                description: "URL'de kullanılacak benzersiz kimlik",
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
                description: 'Kategorilerin sıralanma düzeni (düşük sayılar önce görünür)',
              },
            },
            {
              name: 'isActive',
              label: 'Aktif',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Kategorinin sitede görünür olup olmayacağı',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'SEO Başlık',
              type: 'text',
              maxLength: 60,
              admin: {
                placeholder: 'Ana Yemek Tarifleri | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Nefis ana yemek tarifleri, kolay ve pratik tarifler...',
                description: 'Arama motorlarında görünecek açıklama (160 karakter)',
              },
            },
            {
              name: 'seoKeywords',
              label: 'SEO Anahtar Kelimeler',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  admin: {
                    placeholder: 'yemek tarifi, ana yemek',
                  },
                },
              ],
              admin: {
                description: 'Arama motorları için anahtar kelimeler',
              },
            },
            {
              name: 'canonicalUrl',
              label: 'Canonical URL',
              type: 'text',
              admin: {
                placeholder: 'https://example.com/kategori/ana-yemek',
                description: 'Bu sayfa için canonical URL (opsiyonel)',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Ensure slug is generated if not provided
        if (!data?.slug && data?.name) {
          data.slug = data.name
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
      },
    ],
  },
}
