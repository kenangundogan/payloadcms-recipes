import type { CollectionConfig } from 'payload'

export const Seasons: CollectionConfig = {
  slug: 'seasons',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'months', 'isActive'],
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
              label: 'Mevsim Adı',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'Örn: İlkbahar, Yaz, Sonbahar, Kış',
                description: 'Mevsimin adı',
              },
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              admin: {
                description: 'Bu mevsim hakkında açıklama',
              },
            },
            {
              name: 'months',
              label: 'Aylar',
              type: 'array',
              fields: [
                {
                  name: 'month',
                  type: 'select',
                  options: [
                    { label: 'Ocak', value: 'january' },
                    { label: 'Şubat', value: 'february' },
                    { label: 'Mart', value: 'march' },
                    { label: 'Nisan', value: 'april' },
                    { label: 'Mayıs', value: 'may' },
                    { label: 'Haziran', value: 'june' },
                    { label: 'Temmuz', value: 'july' },
                    { label: 'Ağustos', value: 'august' },
                    { label: 'Eylül', value: 'september' },
                    { label: 'Ekim', value: 'october' },
                    { label: 'Kasım', value: 'november' },
                    { label: 'Aralık', value: 'december' },
                  ],
                },
              ],
              admin: {
                description: 'Bu mevsime ait aylar',
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
                    placeholder: 'sıcak, soğuk, nemli, kuru',
                  },
                },
              ],
              admin: {
                description: 'Mevsimin karakteristik özellikleri',
              },
            },
            {
              name: 'popularIngredients',
              label: 'Mevsimlik Malzemeler',
              type: 'array',
              fields: [
                {
                  name: 'ingredient',
                  type: 'text',
                  admin: {
                    placeholder: 'domates, salatalık, mandalina',
                  },
                },
              ],
              admin: {
                description: 'Bu mevsimde taze olan malzemeler',
              },
            },
            {
              name: 'cookingTips',
              label: 'Pişirme İpuçları',
              type: 'richText',
              admin: {
                description: 'Bu mevsim için özel pişirme önerileri',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'featuredImage',
              label: 'Öne Çıkan Görsel',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Mevsimi temsil eden ana görsel',
              },
            },
            {
              name: 'icon',
              label: 'İkon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Mevsim için ikon',
              },
            },
            {
              name: 'backgroundImage',
              label: 'Arkaplan Görseli',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Mevsim sayfası için arkaplan görseli',
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
                description: 'Aktif mevsimler tariflerde kullanılabilir',
              },
            },
            {
              name: 'isCurrent',
              label: 'Şu Anki Mevsim',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Bu mevsim şu an mı? (Ana sayfada vurgulanır)',
              },
            },
            {
              name: 'temperatureRange',
              label: 'Sıcaklık Aralığı (°C)',
              type: 'group',
              fields: [
                {
                  name: 'min',
                  label: 'Minimum',
                  type: 'number',
                },
                {
                  name: 'max',
                  label: 'Maksimum',
                  type: 'number',
                },
              ],
              admin: {
                description: 'Bu mevsimin genel sıcaklık aralığı',
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
                placeholder: 'Yaz Mevsimi Tarifleri | Site Adı',
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
                  'Yaz mevsiminin taze malzemeleri ile hazırlanan serinletici tarifler...',
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
                    placeholder: 'yaz tarifleri, mevsimlik yemek, taze malzeme',
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
