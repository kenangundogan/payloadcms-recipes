import type { CollectionConfig } from 'payload'

export const Ingredients: CollectionConfig = {
  slug: 'ingredients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'defaultUnit', 'isActive'],
    group: 'Reference Data',
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
              label: 'Malzeme Adı',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: Domates, Un, Tavuk Göğsü',
                description: 'Malzemenin tam adı',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu malzeme hakkında detaylı açıklama',
              },
            },
            {
              name: 'content',
              label: 'İçerik',
              type: 'richText',
              admin: {
                description: 'Bu malzeme hakkında detaylı açıklama',
              },
            },
            {
              name: 'category',
              label: 'Kategori',
              type: 'relationship',
              relationTo: 'ingredientCategories',
              required: true,
              admin: {
                description: 'Malzemenin ait olduğu kategori',
              },
            },
            {
              name: 'defaultUnit',
              label: 'Varsayılan Birim',
              type: 'relationship',
              relationTo: 'ingredientUnits',
              required: true,
              admin: {
                description: 'Bu malzeme için en yaygın kullanılan birim',
              },
            },
            {
              name: 'seasons',
              label: 'Mevsimler',
              type: 'relationship',
              relationTo: 'seasons',
              hasMany: true,
              admin: {
                description: 'Bu malzemenin taze olduğu mevsimler',
              },
            },
            {
              name: 'storageInstructions',
              label: 'Saklama Koşulları',
              type: 'richText',
              admin: {
                description: 'Bu malzemenin nasıl saklanacağı hakkında bilgi',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'image16x9',
              label: '16:9 Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Yatay görsel (1920x1080) - Hero, banner kullanımı için',
              },
            },
            {
              name: 'image1x1',
              label: '1:1 Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Kare görsel (1080x1080) - Kart, grid kullanımı için (zorunlu)',
              },
            },
            {
              name: 'image1x2',
              label: '1:2 Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Dikey görsel (1080x2160) - Mobile, story kullanımı için',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Malzeme için küçük ikon (menülerde kullanılır)',
              },
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
              label: 'Aktif',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Aktif malzemeler tariflerde kullanılabilir',
              },
            },
            {
              name: 'isOrganic',
              label: 'Organik Versiyonu Var',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu malzemenin organik versiyonu bulunuyor mu?',
              },
            },
            {
              name: 'avgPrice',
              label: 'Ortalama Fiyat (₺)',
              type: 'number',
              admin: {
                description: 'Kilogram/litre başına ortalama fiyat (opsiyonel)',
              },
            },
            {
              name: 'availability',
              label: 'Bulunabilirlik',
              type: 'select',
              defaultValue: 'common',
              options: [
                { label: 'Yaygın', value: 'common' },
                { label: 'Orta', value: 'moderate' },
                { label: 'Zor Bulunur', value: 'rare' },
                { label: 'İthal', value: 'imported' },
              ],
              admin: {
                description: 'Bu malzeme ne kadar kolay bulunur?',
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
                placeholder: 'Domates ile Yapılan Tarifler | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Taze domateslerle hazırlanan nefis yemek tarifleri...',
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
                    placeholder: 'domates tarifi, taze domates, domates yemeği',
                  },
                },
              ],
              admin: {
                description: 'Arama motorları için anahtar kelimeler',
              },
            },
          ],
        },
      ],
    },
  ],
}
