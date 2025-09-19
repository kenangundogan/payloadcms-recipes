import type { CollectionConfig } from 'payload'

export const Cuisines: CollectionConfig = {
  slug: 'cuisines',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'isActive'],
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
              label: 'Mutfak Adı',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: Türk Mutfağı, İtalyan Mutfağı',
                description: 'Mutfağın adı',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu mutfak hakkında detaylı açıklama',
              },
            },
            {
              name: 'geographicScope',
              label: 'Coğrafi Kapsam',
              type: 'group',
              fields: [
                {
                  name: 'continent',
                  label: 'Kıta',
                  type: 'relationship',
                  relationTo: 'continents',
                  admin: {
                    description: 'Bu mutfağın ana kıtası (opsiyonel)',
                  },
                },
                {
                  name: 'countries',
                  label: 'Ülkeler',
                  type: 'relationship',
                  relationTo: 'countries',
                  hasMany: true,
                  admin: {
                    description: 'Bu mutfağın yaygın olduğu ülkeler',
                  },
                },
                {
                  name: 'regions',
                  label: 'Bölgeler',
                  type: 'relationship',
                  relationTo: 'regions',
                  hasMany: true,
                  admin: {
                    description: 'Bu mutfağın özgün olduğu bölgeler',
                  },
                },
                {
                  name: 'cities',
                  label: 'Şehirler',
                  type: 'relationship',
                  relationTo: 'cities',
                  hasMany: true,
                  admin: {
                    description: 'Bu mutfağın karakteristiğini aldığı şehirler',
                  },
                },
              ],
              admin: {
                description: 'Bu mutfağın coğrafi yayılımı ve kökenleri',
              },
            },
            {
              name: 'primaryLocation',
              label: 'Ana Lokasyon',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  label: 'Lokasyon Türü',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Kıta', value: 'continent' },
                    { label: 'Ülke', value: 'country' },
                    { label: 'Bölge', value: 'region' },
                    { label: 'Şehir', value: 'city' },
                  ],
                  admin: {
                    description: 'Bu mutfağın en spesifik lokasyon seviyesi',
                  },
                },
                {
                  name: 'continent',
                  label: 'Kıta',
                  type: 'relationship',
                  relationTo: 'continents',
                  admin: {
                    condition: (data) => data.primaryLocation?.type === 'continent',
                    description: 'Ana kıta seçimi',
                  },
                },
                {
                  name: 'country',
                  label: 'Ülke',
                  type: 'relationship',
                  relationTo: 'countries',
                  admin: {
                    condition: (data) => data.primaryLocation?.type === 'country',
                    description: 'Ana ülke seçimi',
                  },
                },
                {
                  name: 'region',
                  label: 'Bölge',
                  type: 'relationship',
                  relationTo: 'regions',
                  admin: {
                    condition: (data) => data.primaryLocation?.type === 'region',
                    description: 'Ana bölge seçimi',
                  },
                },
                {
                  name: 'city',
                  label: 'Şehir',
                  type: 'relationship',
                  relationTo: 'cities',
                  admin: {
                    condition: (data) => data.primaryLocation?.type === 'city',
                    description: 'Ana şehir seçimi',
                  },
                },
              ],
              admin: {
                description: 'Bu mutfağın ana kimliğini belirleyen coğrafi lokasyon',
              },
            },
            {
              name: 'characteristics',
              label: 'Özellikler',
              type: 'array',
              fields: [
                {
                  name: 'characteristic',
                  type: 'text',
                  admin: {
                    placeholder: 'baharatlı, yağlı, tatlı',
                  },
                },
              ],
              admin: {
                description: 'Bu mutfağın karakteristik özellikleri',
              },
            },
            {
              name: 'popularIngredients',
              label: 'Popüler Malzemeler',
              type: 'array',
              fields: [
                {
                  name: 'ingredient',
                  type: 'text',
                  admin: {
                    placeholder: 'zeytinyağı, domates, soğan',
                  },
                },
              ],
              admin: {
                description: 'Bu mutfakta sık kullanılan malzemeler',
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
                description: 'Mutfak için ikon',
              },
            },
            {
              name: 'flag',
              label: 'Bayrak/Simge',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Ülke bayrağı veya mutfak simgesi',
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
                description: 'Aktif mutfaklar tariflerde kullanılabilir',
              },
            },
            {
              name: 'isFeatured',
              label: 'Öne Çıkarılsın mı?',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Ana sayfada öne çıkarılsın mı?',
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
                placeholder: 'Türk Mutfağı Tarifleri | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder: 'Nefis Türk mutfağı tarifleri, geleneksel lezzetler...',
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
                    placeholder: 'türk mutfağı, geleneksel yemek',
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
