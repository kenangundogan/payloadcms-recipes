import type { CollectionConfig } from 'payload'

export const Countries: CollectionConfig = {
  slug: 'countries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'continent', 'capital', 'isActive'],
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
              label: 'Ülke Adı',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: Türkiye, İtalya, Fransa',
                description: 'Ülkenin tam adı',
              },
            },
            {
              name: 'code',
              label: 'Ülke Kodu',
              type: 'text',
              required: true,
              unique: true,
              maxLength: 3,
              admin: {
                placeholder: 'TR, IT, FR',
                description: 'ISO 3166-1 alfa-2 ülke kodu',
              },
            },
            {
              name: 'continent',
              label: 'Kıta',
              type: 'relationship',
              relationTo: 'continents',
              required: true,
              admin: {
                description: 'Bu ülkenin bulunduğu kıta',
              },
            },
            {
              name: 'capital',
              label: 'Başkent',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Ankara, Roma, Paris',
                description: 'Ülkenin başkenti',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu ülke hakkında genel bilgiler',
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
              required: true,
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
              name: 'flag',
              label: 'Bayrak',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Ülkenin bayrağı',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Ülke için ikon',
              },
            },
            {
              name: 'color',
              label: 'Tema Rengi',
              type: 'text',
              admin: {
                placeholder: '#E74C3C, #27AE60, #3498DB',
                description: 'Ülke için tema rengi (hex kod)',
              },
            },
            {
              name: 'gallery',
              label: 'Galeri',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  label: 'Açıklama',
                  type: 'text',
                  admin: {
                    placeholder: 'Bu görselin açıklaması',
                  },
                },
              ],
              admin: {
                description: 'Ülke ile ilgili görseller',
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
                description: 'Aktif ülkeler sistemde kullanılabilir',
              },
            },
            {
              name: 'isIndependent',
              label: 'Bağımsız Ülke',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Bu ülke bağımsız bir devlet mi?',
              },
            },
            {
              name: 'regionCount',
              label: 'Bölge Sayısı',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Bu ülkedeki bölge sayısı (otomatik hesaplanır)',
              },
            },
            {
              name: 'adminNotes',
              label: 'Yönetici Notları',
              type: 'textarea',
              admin: {
                description: 'Sadece yöneticiler için notlar (kullanıcılara görünmez)',
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
                placeholder: 'Türk mutfağının en lezzetli geleneksel yemek tarifleri...',
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
                    placeholder: 'türk mutfağı, türk yemekleri, türk tarifleri',
                  },
                },
              ],
              admin: {
                description: 'Arama motorları için anahtar kelimeler',
              },
            },
            {
              name: 'seoImage',
              label: 'SEO Görseli',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Sosyal medyada paylaşılırken kullanılacak görsel',
              },
            },
          ],
        },
      ],
    },
  ],
}
