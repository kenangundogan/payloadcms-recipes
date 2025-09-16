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
              name: 'country',
              label: 'Ülke',
              type: 'relationship',
              relationTo: 'countries',
              required: true,
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
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu şehir hakkında detaylı bilgiler',
              },
            },
            {
              name: 'coordinates',
              label: 'Koordinatlar',
              type: 'group',
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
              admin: {
                description: 'Şehrin GPS koordinatları',
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
              name: 'skylineImage',
              label: 'Silüet Görseli',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Şehrin silüet/panorama görseli',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Şehir için ikon',
              },
            },
            {
              name: 'color',
              label: 'Tema Rengi',
              type: 'text',
              admin: {
                placeholder: '#E74C3C, #2ECC71, #F39C12',
                description: 'Şehir için tema rengi (hex kod)',
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
                {
                  name: 'location',
                  label: 'Konum',
                  type: 'text',
                  admin: {
                    placeholder: 'Sultanahmet, Colosseum, Eiffel Tower',
                  },
                },
              ],
              admin: {
                description: 'Şehir ile ilgili ek görseller',
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
                description: 'Aktif şehirler sistemde kullanılabilir',
              },
            },
            {
              name: 'isCapital',
              label: 'Başkent mi?',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu şehir ülkenin başkenti mi?',
              },
            },
            {
              name: 'isMajorCity',
              label: 'Büyük Şehir',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu şehir büyük bir metropol mü?',
              },
            },
            {
              name: 'isTouristDestination',
              label: 'Turist Destinasyonu',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu şehir popüler bir turist destinasyonu mu?',
              },
            },
            {
              name: 'economicActivity',
              label: 'Ana Ekonomik Faaliyet',
              type: 'select',
              options: [
                { label: 'Ticaret', value: 'commerce' },
                { label: 'Turizm', value: 'tourism' },
                { label: 'Sanayi', value: 'industry' },
                { label: 'Hizmet', value: 'services' },
                { label: 'Tarım', value: 'agriculture' },
                { label: 'Balıkçılık', value: 'fishing' },
                { label: 'Teknoloji', value: 'technology' },
                { label: 'Finans', value: 'finance' },
              ],
              admin: {
                description: 'Şehrin ana ekonomik faaliyeti',
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
                placeholder: 'İstanbul Yemekleri | Site Adı',
                description: 'Arama motorlarında görünecek başlık (60 karakter)',
              },
            },
            {
              name: 'seoDescription',
              label: 'SEO Açıklama',
              type: 'textarea',
              maxLength: 160,
              admin: {
                placeholder:
                  "İstanbul'un en lezzetli sokak lezzetleri ve geleneksel yemek tarifleri...",
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
                    placeholder: 'istanbul yemekleri, istanbul mutfağı, balık ekmek',
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
